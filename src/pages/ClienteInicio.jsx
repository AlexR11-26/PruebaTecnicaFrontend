import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { listarClientes, insertarCliente } from "../services/clienteService"
import "./ClienteInicio.css"

function ClienteInicio() {
  const navigate = useNavigate()

  const [modo, setModo] = useState("")
  const [form, setForm] = useState({
    documento: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const soyCliente = async () => {
    const clientes = await listarClientes()
    const existe = clientes.find(c => c.email === form.email)

    if (existe) {
    localStorage.setItem("idCliente", existe.idCliente)
      navigate("/catalogo")
    } else {
      alert("Email no encontrado")
    }
  }

  const registrarme = async () => {
  try {
    await insertarCliente({
      idCliente: 0,
      documento: form.documento,
      nombres: form.nombres,
      apellidos: form.apellidos,
      email: form.email,
      telefono: form.telefono
    })

    alert("Cliente registrado correctamente. Ahora inicia sesión.")
    
    // Volver al modo "cliente" para iniciar sesión
    setModo("cliente")
    
    // Limpiamos el formulario
    setForm({
      documento: "",
      nombres: "",
      apellidos: "",
      email: "",
      telefono: ""
    })

  } catch (error) {
    console.error(error)
    alert("Error al registrar cliente")
  }
}



  const volverInicio = () => {
    setModo("")
    setForm({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: ""
    })
    }


  return (
    <div className="cliente-container">
      <div className="cliente-card">
        <h2 className="titulo">Bienvenido</h2>

        {!modo && (
          <div className="botones">
            <button className="btn primary" onClick={() => setModo("cliente")}>
              Soy Cliente
            </button>
            <button className="btn secondary" onClick={() => setModo("registrar")}>
              Registrarme
            </button>
          </div>
        )}

        {modo === "cliente" && (
          <>
            <h3>Ingrese su Email</h3>
            <input
              className="input"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <button className="btn primary full" onClick={soyCliente}>
              Ingresar
            </button>
            <button className="btn back full" onClick={volverInicio}>
                Volver
                </button>
          </>
        )}

        {modo === "registrar" && (
          <>
            <h3>Registro</h3>
            <input className="input" name="documento" placeholder="Documento" onChange={handleChange} />
            <input className="input" name="nombres" placeholder="Nombres" onChange={handleChange} />
            <input className="input" name="apellidos" placeholder="Apellidos" onChange={handleChange} />
            <input className="input" name="email" placeholder="Email" onChange={handleChange} />
            <input className="input" name="telefono" placeholder="Teléfono" onChange={handleChange} />

            <button className="btn primary full" onClick={registrarme}>
              Registrar
            </button>
            <button className="btn back full" onClick={volverInicio}>
      Volver
    </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ClienteInicio
