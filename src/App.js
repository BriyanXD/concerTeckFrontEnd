import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import RegisterUser from "./components/RegisterUser/RegisterUser.jsx";
import RegisterEvent from "./components/RegisterEvent/RegisterEvents";
import Detail from "./components/Detail/Detail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Cart from "./components/Cart/Cart";
import ProfileUser from "./components/ProfileUser/ProfileUser.jsx";
import PanelAdmin from "./components/Admin/adminPanel";
/* import ProtectedRoutes from './components/customHooks/ProtectedRoutes.jsx'; */

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Detail />} />
          {/* <Route exact path='/registrar/:usuario' element= {<ProfileUser/>}/> */}
          {/* <Route element={<ProtectedRoutes/>}> */}
          <Route exact path="/perfil/:id" element={<ProfileUser />} />
          {/* </Route> */}
          {/* <Route element={<ProtectedRoutesAdmin/>}> */}
          <Route path="/perfil/panelAdmin" element={<PanelAdmin />} />
          {/* </Route> */}
          {/* <Route exact path='' element= {<Ruta/>}/> 
            <Route exact path='' element= {<Ruta/>}/>  */}
          <Route path="/cart" element={<Cart />} />
          <Route exact path="/events" element={<RegisterEvent />} />
          <Route path="/events" element={<RegisterEvent />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/perfil" element={<PageNotFound />} />
          <Route path="/pageNotFound" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
