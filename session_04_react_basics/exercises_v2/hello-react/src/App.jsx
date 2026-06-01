import ClickEvents from "./components/ClickEvents";
import InputEvents from "./components/InputEvents";
import KeyboardEvents from "./components/KeyboardEvents";
import FormEvents from "./components/FormEvents";

function App() {
  return (
    <div>
      <ClickEvents />
      <hr />
      <InputEvents />
      <hr />
      <KeyboardEvents />
      <hr />
      <FormEvents />
    </div>
  );
}

export default App;