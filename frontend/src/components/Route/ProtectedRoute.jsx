import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) return null; 

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};
export default ProtectedRoute;
