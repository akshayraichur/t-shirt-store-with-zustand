import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import RouteDetails from "./utils/Routes";

function App() {
  return (
    <>
      <Navbar />
      <RouteDetails />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
