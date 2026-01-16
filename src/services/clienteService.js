import axios from "axios"

const API_URL = "https://pruebatecnicabackend-cnarfjfzcrbabbce.canadacentral-01.azurewebsites.net/api/clientes"

export const listarClientes = async () => {
  const response = await axios.get(`${API_URL}/listar`)
  return response.data
}

export const insertarCliente = async (cliente) => {
  return await axios.post(`${API_URL}/insertar`, cliente)
}
