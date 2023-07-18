import { useAppSelector } from "@/redux/reduxHooks";

const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  if (auth?.accessToken && auth?.user) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
