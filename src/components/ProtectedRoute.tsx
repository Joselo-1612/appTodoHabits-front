import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo?: string;
  children?: ReactNode;
}

const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/login",
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? (children as JSX.Element) : <Outlet />;
};

export default ProtectedRoute;
