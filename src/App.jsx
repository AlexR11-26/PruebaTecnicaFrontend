import { Routes, Route } from "react-router-dom"
import ClienteInicio from "./pages/ClienteInicio"
import CatalogoProductos from "./pages/CatalogoProductos"

function App() {
  return (
    <Routes>
      <Route path="/" element={<ClienteInicio />} />
      <Route path="/catalogo" element={<CatalogoProductos />} />
    </Routes>
  )
}

export default App
