import { useEffect, useState } from "react"
import { listarProductos } from "../services/productoService"
import { listarCategorias } from "../services/categoriaService"
import { useCarrito } from "../context/CarritoContext"
import ProductoCard from "../components/ProductoCard"
import CarritoModal from "../components/CarritoModal" // nuevo
import "./CatalogoProductos.css"

function CatalogoProductos() {
  const { agregarProducto } = useCarrito()
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [busqueda, setBusqueda] = useState("")
  const [loading, setLoading] = useState(true)

  const [carritoVisible, setCarritoVisible] = useState(false) // estado para mostrar/ocultar

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const [prods, cats] = await Promise.all([listarProductos(), listarCategorias()])
      setProductos(prods)
      setCategorias(cats)
    } catch (error) {
      console.error(error)
      alert("Error al cargar datos")
    } finally {
      setLoading(false)
    }
  }

  const productosFiltrados = productos.filter(p => {
    if (p.stock <= 0) return false
    const coincideCategoria = categoriaSeleccionada ? p.categoriaId === Number(categoriaSeleccionada) : true
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCategoria && coincideNombre
  })

  if (loading) return <p style={{ padding: 40 }}>Cargando productos...</p>

  return (
    <div className="catalogo-container">
      <h1 className="titulo">🛒 Catálogo de Productos</h1>

      {/* Botón flotante para abrir carrito */}
      <button className="btn-carrito" onClick={() => setCarritoVisible(true)}>
        🛒 Ver Carrito
      </button>

      <div className="filtros">
        <select value={categoriaSeleccionada} onChange={e => setCategoriaSeleccionada(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map(c => <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>)}
        </select>
        <input type="text" placeholder="Buscar producto..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      </div>

      <div className="grid">
        {productosFiltrados.length === 0 && <p>No se encontraron productos</p>}
        {productosFiltrados.map(p => (
          <ProductoCard key={p.idProducto} producto={p} agregarAlCarrito={agregarProducto} />
        ))}
      </div>

      {/* Carrito modal */}
      {carritoVisible && <CarritoModal onCerrar={() => setCarritoVisible(false)} />}
    </div>
  )
}

export default CatalogoProductos
