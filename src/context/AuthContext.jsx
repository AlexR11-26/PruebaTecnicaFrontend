import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(
    JSON.parse(localStorage.getItem("cliente"))
  )

  const navigate = useNavigate()

  const login = (dataCliente) => {
    localStorage.setItem("cliente", JSON.stringify(dataCliente))
    setCliente(dataCliente)
    navigate("/catalogo")
  }

  const logout = () => {
    localStorage.removeItem("cliente")
    setCliente(null)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ cliente, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
