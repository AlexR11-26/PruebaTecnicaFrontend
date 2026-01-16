import { createContext, useContext, useState } from "react"

const CarritoContext = createContext()

export const useCarrito = () => useContext(CarritoContext)

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])

  const agregarProducto = (producto, cantidad) => {
    const existe = carrito.find(p => p.idProducto === producto.idProducto)

    if (existe) {
      setCarrito(
        carrito.map(p =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        )
      )
    } else {
      setCarrito([...carrito, { ...producto, cantidad }])
    }
  }

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto }}>
      {children}
    </CarritoContext.Provider>
  )
}
