import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoutesAdmin = () => {
  const {
    user,
  } = useAuth0()

  return user.isAdmin === true ? <Outlet /> : <Navigate to="/pageNotFound" />;
};

export default ProtectedRoutesAdmin;