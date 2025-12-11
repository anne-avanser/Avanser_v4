// AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas

//  import Landing from "../pages/usuario/landing"
//  import Login from "../pages/usuario/login";
 import Welcome from "../pages/instructor/Recibimiento";
 import Reporte from "../pages/instructor/Reportes";
 import Rendimiento from "../pages/instructor/Rendimiento";
 import MiFicha from "../pages/instructor/Mi_ficha";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>


        
        {/* <Route path="/" element={<Landing />} />
        <Route path="/login" element = {<Login />} /> */}
         <Route path="/" element={<Welcome />} />   
        <Route path="/Reporte" element={<Reporte />} />
        <Route path="/Rendimiento" element={<Rendimiento />} />
        <Route path="/Mi_Ficha" element={<MiFicha />} />
         
       
        
        

      </Routes>
    </BrowserRouter>
  );
}
