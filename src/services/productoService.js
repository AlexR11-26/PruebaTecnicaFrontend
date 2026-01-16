import axios from "axios"

const API_URL = "https://localhost:7079/api/productos"

export const listarProductos = async () => {
  const response = await axios.get(`${API_URL}/listar`)
  return response.data
}
