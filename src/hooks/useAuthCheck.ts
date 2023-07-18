import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/reduxHooks";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken) {
        dispatch(userLoggedIn(auth.accessToken));
      }
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
};

export default useAuthCheck;
