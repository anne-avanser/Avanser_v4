// AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
// Usuario-Landing
//  import Landing from "../pages/usuario/landing"
//  import Login from "../pages/usuario/login";

// Instructor
 import Welcome_Instructor from "../pages/instructor/Recibimiento";
 import Reporte from "../pages/instructor/Reportes";
 import Rendimiento from "../pages/instructor/Rendimiento";
 import MiFicha from "../pages/instructor/Mi_ficha";

//  Bienestar
import Welcome_Bienestar from "../pages/bienestar/Recibimiento_Bienestar";
import Dashboard_Bienestar from "../pages/bienestar/Dashboard";
import Registro_Bienestar from "../pages/bienestar/Registro_Casos";
import Historial_Bienestar from "../pages/bienestar/Historial_casos";
import Noticias_Bienestar from "../pages/bienestar/Noticias";
import Notificaciones_Bienestar from "../pages/bienestar/Notificaciones";
import Perfil_Bienestar from "../pages/bienestar/Perfil_Bienestar";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>


        {/* Usuario-Landing */}
        {/* <Route path="/" element={<Landing />} />
        <Route path="/login" element = {<Login />} /> */}

        {/* Instructor */}
        {/* <Route path="/" element={<Welcome_Instructor/>} />   
        <Route path="/Reporte" element={<Reporte />} />
        <Route path="/Rendimiento" element={<Rendimiento />} />
        <Route path="/Mi_Ficha" element={<MiFicha />} /> */}


        {/* Bienestar  */}
        <Route path="/" element={<Welcome_Bienestar />} />
        <Route path="/Dashboard_Bienestar" element={<Dashboard_Bienestar />} />
        <Route path="/Registro_Bienestar" element={<Registro_Bienestar />} />
        <Route path="/Historial_Bienestar" element={<Historial_Bienestar />} />
       <Route path="/Noticias_Bienestar" element={<Noticias_Bienestar />} />
       <Route path="/Notificaciones_Bienestar" element={<Notificaciones_Bienestar />} />
       <Route path="/Perfil_Bienestar" element={<Perfil_Bienestar />} />
       

         
       
        
        

      </Routes>
    </BrowserRouter>
  );
}
