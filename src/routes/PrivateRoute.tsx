// import { useAppSelector } from "@/redux/reduxHooks";
import useAuth from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  // const { user, isLoading } = useAppSelector((state) => state.user);
  const isLoggedIn = useAuth();

  const location = useLocation();

  // if (isLoading) {
  //   return <p>Loading....</p>;
  // }
  if (!isLoggedIn) {
    // console.log(!user.email, !isLoading);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
