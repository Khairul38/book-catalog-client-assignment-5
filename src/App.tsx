import Loader from "./components/ui/Loader";
import useAuthCheck from "./hooks/useAuthCheck";
import MainLayout from "./layouts/MainLayout";

function App() {
  const authChecked = useAuthCheck();

  if (!authChecked) return <Loader />;

  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
