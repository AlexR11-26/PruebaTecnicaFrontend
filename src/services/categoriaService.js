import axios from "axios"

const API_URL = "https://localhost:7079/api/categorias"

export const listarCategorias = async () => {
  const response = await axios.get(`${API_URL}/listar`)
  return response.data
}
