import { useEffect, useState } from "react"
import { listarCategorias } from "../services/categoriaService"
import { listarProductos } from "../services/productoService"
import { useCarrito } from "../context/CarritoContext"

function Catalogo() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [ordenPrecio, setOrdenPrecio] = useState("asc")

  const { agregarProducto } = useCarrito()

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    const cats = await listarCategorias()
    const prods = await listarProductos()

    setCategorias(cats)
    setProductos(prods)
  }

  const productosFiltrados = productos
    .filter(p =>
      categoriaSeleccionada
        ? p.categoriaId === Number(categoriaSeleccionada)
        : true
    )
    .sort((a, b) =>
      ordenPrecio === "asc"
        ? a.precio - b.precio
        : b.precio - a.precio
    )

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Catálogo de Productos</h2>

      {/* FILTROS */}
      <div style={{ marginBottom: 20 }}>
        <select onChange={e => setCategoriaSeleccionada(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map(c => (
            <option key={c.idCategoria} value={c.idCategoria}>
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          style={{ marginLeft: 10 }}
          onChange={e => setOrdenPrecio(e.target.value)}
        >
          <option value="asc">Precio ↑</option>
          <option value="desc">Precio ↓</option>
        </select>
      </div>

      {/* PRODUCTOS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {productosFiltrados.map(p => (
          <ProductoCard key={p.idProducto} producto={p} onAdd={agregarProducto} />
        ))}
      </div>
    </div>
  )
}

export default Catalogo
