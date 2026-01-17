import { useCarrito } from "../context/CarritoContext"
import "./CarritoModal.css"

function CarritoModal({ onCerrar }) {
  const { carrito, eliminarProducto, vaciarCarrito, total } = useCarrito()

  const comprar = () => {
    alert(`Compra realizada! Total: S/ ${total.toFixed(2)}`)
    vaciarCarrito()
    onCerrar()
  }

  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <button className="cerrar" onClick={onCerrar}>×</button>
        <h2>🛍️ Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map(item => (
                  <tr key={item.idProducto}>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>S/ {item.precio}</td>
                    <td>S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                    <td>
                      <button onClick={() => eliminarProducto(item.idProducto)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total: S/ {total.toFixed(2)}</h3>
            <button onClick={comprar}>Comprar</button>
          </>
        )}
      </div>
    </div>
  )
}

export default CarritoModal
