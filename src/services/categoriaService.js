import axios from "axios"

const API_URL = "https://pruebatecnicabackend-cnarfjfzcrbabbce.canadacentral-01.azurewebsites.net/api/categorias"

export const listarCategorias = async () => {
  const response = await axios.get(`${API_URL}/listar`)
  return response.data
}
