import { useEffect, useState } from "react"
import { listarProductos } from "../services/productoService"
import { listarCategorias } from "../services/categoriaService"
import "./CatalogoProductos.css"
import ProductoCard from "../components/ProductoCard"


function CatalogoProductos() {
  const [carrito, setCarrito] = useState([])

  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [busqueda, setBusqueda] = useState("")

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])
 
  const agregarAlCarrito = (producto, cantidad) => {
  if (cantidad < 1) return

  setCarrito(prev => {
    const existe = prev.find(p => p.idProducto === producto.idProducto)

    if (existe) {
      const nuevaCantidad = existe.cantidad + cantidad

      if (nuevaCantidad > producto.stock) {
        alert("No hay suficiente stock disponible")
        return prev
      }

      return prev.map(p =>
        p.idProducto === producto.idProducto
          ? { ...p, cantidad: nuevaCantidad }
          : p
      )
    }

    if (cantidad > producto.stock) {
      alert("No hay suficiente stock disponible")
      return prev
    }

    return [...prev, { ...producto, cantidad }]
  })
}

  const cargarDatos = async () => {
    try {
      const [prods, cats] = await Promise.all([
        listarProductos(),
        listarCategorias()
      ])

      setProductos(prods)
      setCategorias(cats)
    } catch (error) {
      console.error(error)
      alert("Error al cargar datos")
    } finally {
      setLoading(false)
    }
  }

  // 👉 FILTRO EN FRONTEND
  const productosFiltrados = productos.filter(p => {
  if (p.stock <= 0) return false

  const coincideCategoria =
    categoriaSeleccionada
      ? p.categoriaId === Number(categoriaSeleccionada)
      : true

  const coincideNombre =
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())

  return coincideCategoria && coincideNombre
})


  if (loading) {
    return <p style={{ padding: 40 }}>Cargando productos...</p>
  }

  return (
    <div className="catalogo-container">
      <h1 className="titulo">🛒 Catálogo de Productos</h1>

      {/* FILTROS */}
      <div className="filtros">
        <select
          value={categoriaSeleccionada}
          onChange={e => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map(c => (
            <option key={c.idCategoria} value={c.idCategoria}>
              {c.nombre}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid">
        {productosFiltrados.length === 0 && (
          <p>No se encontraron productos</p>
        )}

        {productosFiltrados.map(p => (
        <ProductoCard
            key={p.idProducto}
            producto={p}
            agregarAlCarrito={agregarAlCarrito}
        />
        ))}

      </div>
    </div>
  )
}

export default CatalogoProductos
