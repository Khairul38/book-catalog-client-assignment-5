import Loader from "./components/ui/Loader";
import useAuthCheck from "./hooks/useAuthCheck";
import MainLayout from "./layouts/MainLayout";
import { Worker } from "@react-pdf-viewer/core";

function App() {
  const authChecked = useAuthCheck();

  if (!authChecked) return <Loader />;

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div>
        <MainLayout />
      </div>
    </Worker>
  );
}

export default App;
