import LifecycleDemo from "./components/LifecycleDemo";
import BadCounter from "./components/BadCounter";
import GoodCounter from "./components/GoodCounter";
import FlowDemo from "./components/FlowDemo";

function App() {
  return (
    <div>
      <LifecycleDemo />
      <hr />
      <BadCounter />
      <hr />
      <GoodCounter />
      <hr />
      <FlowDemo />
    </div>
  );
}

export default App;