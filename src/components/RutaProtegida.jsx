import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function RutaProtegida({ children }) {
  const { cliente } = useAuth()

  if (!cliente) {
    return <Navigate to="/" />
  }

  return children
}

export default RutaProtegida
