import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { listarClientes, insertarCliente } from "../services/clienteService"

function ClienteInicio() {
  const navigate = useNavigate()

  const [modo, setModo] = useState("") // cliente | registrar
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 👉 SOY CLIENTE
  const soyCliente = async () => {
    const clientes = await listarClientes()
    const existe = clientes.find(c => c.email === form.email)

    if (existe) {
      navigate("/catalogo")
    } else {
      alert("Email no encontrado")
    }
  }

  // 👉 REGISTRARME
  const registrarme = async () => {
    await insertarCliente({
      idCliente: 0,
      nombres: form.nombres,
      apellidos: form.apellidos,
      email: form.email,
      telefono: form.telefono
    })

    alert("Cliente registrado")
    navigate("/catalogo")
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Bienvenido</h2>

      {!modo && (
        <>
          <button onClick={() => setModo("cliente")}>Soy Cliente</button>
          <button onClick={() => setModo("registrar")}>Registrarme</button>
        </>
      )}

      {modo === "cliente" && (
        <>
          <h3>Ingrese su Email</h3>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <br /><br />
          <button onClick={soyCliente}>Ingresar</button>
        </>
      )}

      {modo === "registrar" && (
        <>
          <h3>Registro</h3>
          <input name="nombres" placeholder="Nombres" onChange={handleChange} /><br />
          <input name="apellidos" placeholder="Apellidos" onChange={handleChange} /><br />
          <input name="email" placeholder="Email" onChange={handleChange} /><br />
          <input name="telefono" placeholder="Teléfono" onChange={handleChange} /><br /><br />
          <button onClick={registrarme}>Registrar</button>
        </>
      )}
    </div>
  )
}

export default ClienteInicio

