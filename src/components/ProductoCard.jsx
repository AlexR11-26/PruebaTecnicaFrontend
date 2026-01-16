import { useState } from "react"

function ProductoCard({ producto, onAdd }) {
  const [cantidad, setCantidad] = useState(1)

  return (
    <div style={{ border: "1px solid #ccc", padding: 15 }}>
      <h4>{producto.nombre}</h4>
      <p>Categoría: {producto.categoria}</p>
      <p>Precio: S/ {producto.precio}</p>
      <p>Stock: {producto.stock}</p>

      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={e => setCantidad(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={() => onAdd(producto, cantidad)}>
        🛒 Agregar al carrito
      </button>
    </div>
  )
}

export default ProductoCard
