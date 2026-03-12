import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/lib/store/auth-store";

interface ProtectedRouteProps {
  redirectTo?: string; // default: "/sign-in"
}

export function ProtectedRoute({
  redirectTo = "/sign-in",
}: ProtectedRouteProps) {
  const { user } = useAuthStore();
  const location = useLocation();
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
