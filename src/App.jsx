import { Routes, Route } from "react-router-dom"
import ClienteInicio from "./pages/ClienteInicio"
import CatalogoProductos from "./pages/CatalogoProductos"
import { CarritoProvider } from "./context/CarritoContext"

function App() {
  return (
    <CarritoProvider>
      <Routes>
        <Route path="/" element={<ClienteInicio />} />
        <Route path="/catalogo" element={<CatalogoProductos />} />
      </Routes>
    </CarritoProvider>
  )
}

export default App
