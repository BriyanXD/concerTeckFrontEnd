import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoutes = () => {
    const {
        user,
      } = useAuth0()
    
//   const isAuth = useAuth();
  return user ? <Outlet /> : <Navigate to="/pageNotFound" />;
};

export default ProtectedRoutes;