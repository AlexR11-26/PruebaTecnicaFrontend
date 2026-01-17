import { useCarrito } from "../context/CarritoContext"
import "./CarritoModal.css"

function CarritoModal({ onCerrar }) {
  const { carrito, eliminarProducto, vaciarCarrito, total } = useCarrito()

  // Función para comprar
  const comprar = async () => {
    const idCliente = localStorage.getItem("idCliente")
    if (!idCliente) {
      alert("Debe iniciar sesión para comprar")
      return
    }

    if (carrito.length === 0) {
      alert("El carrito está vacío")
      return
    }

    const body = {
      idCliente: Number(idCliente),
      detalles: carrito.map(item => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad
      }))
    }

    try {
      const response = await fetch(
        "https://pruebatecnicabackend-cnarfjfzcrbabbce.canadacentral-01.azurewebsites.net/api/ordenes/insertar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      )

      const data = await response.json()

      if (data.success) {
        alert(`Compra realizada! ID Orden: ${data.idOrden} - Total: S/ ${data.totalOrden}`)
        vaciarCarrito()
        // Al cerrar después de comprar, recargamos la página para actualizar stock
        onCerrar()
        window.location.reload()
      } else {
        alert("Error al realizar la compra")
      }
    } catch (error) {
      console.error(error)
      alert("Error al comunicarse con el servidor")
    }
  }

  // Función para cerrar modal sin comprar
  const handleCerrar = () => {
    onCerrar()
    window.location.reload() // recarga productos para actualizar stock
  }

  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <button className="cerrar" onClick={handleCerrar}>×</button>
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
