import { useState } from "react"

function ProductoCard({ producto, agregarAlCarrito }) {
  const [cantidad, setCantidad] = useState(1)

  const aumentar = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1)
    }
  }

  const disminuir = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  return (
    <div className="card">
      <div className="imagen">
        {producto.imagenUrl ? (
          <img src={producto.imagenUrl} alt={producto.nombre} />
        ) : (
          <div className="sin-imagen">Sin imagen</div>
        )}
      </div>

      <div className="contenido">
        <h3>{producto.nombre}</h3>
        <p className="categoria">{producto.categoria}</p>
        <p className="precio">S/ {producto.precio}</p>
        <p className="stock">Stock: {producto.stock}</p>

        {/* CONTROL DE CANTIDAD */}
        <div className="cantidad-control">
          <button onClick={disminuir} disabled={cantidad <= 1}>−</button>
<span>{cantidad}</span>
<button onClick={aumentar} disabled={cantidad >= producto.stock}>+</button>

        </div>

        <button
          className="btn"
          onClick={() => agregarAlCarrito(producto, cantidad)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductoCard
