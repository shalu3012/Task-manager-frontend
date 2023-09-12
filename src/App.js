import Cards from "./components/Cards";
import { ToastContainer, toast } from "react-toastify";
import { DragDropContext } from "react-beautiful-dnd";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Cards />

      <ToastContainer />
    </div>
  );
}

export default App;
