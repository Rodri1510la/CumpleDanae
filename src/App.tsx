import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Mensajes from "@/pages/Mensajes";
import NuevoMensaje from "@/pages/NuevoMensaje";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mensajes" element={<Mensajes />} />
        <Route path="/nuevo-mensaje" element={<NuevoMensaje />} />
      </Routes>
    </Router>
  );
}
