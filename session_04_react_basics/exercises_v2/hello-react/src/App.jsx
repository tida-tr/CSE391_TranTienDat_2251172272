import NumberState from "./components/NumberState";
import StringState from "./components/StringState";
import BooleanState from "./components/BooleanState";
import MultipleStates from "./components/MultipleStates";

function App() {
  return (
    <div>
      <NumberState />
      <hr />
      <StringState />
      <hr />
      <BooleanState />
      <hr />
      <MultipleStates />
    </div>
  );
}

export default App;