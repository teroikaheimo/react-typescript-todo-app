import "./App.css";
import TodoContainer from "./features/todo/todoContainer/TodoContainer";
import "primereact/resources/themes/lara-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //Icons
// TODO Remove this to stop Mirage mocking API responses.
import "./mirage/mirage";
import ToastContainer from "./features/toast/ToastContainer";

function App() {
  return (
    <div id="app-root" className="App">
      <ToastContainer></ToastContainer>
      <TodoContainer></TodoContainer>
    </div>
  );
}

export default App;
