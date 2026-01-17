import { createContext, useContext, useState } from "react"

const CarritoContext = createContext()

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])

  const agregarProducto = (producto, cantidad) => {
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

  const eliminarProducto = (idProducto) => {
    setCarrito(prev => prev.filter(p => p.idProducto !== idProducto))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => useContext(CarritoContext)
