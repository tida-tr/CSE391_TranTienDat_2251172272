import ListBasics from "./components/ListBasics";
import CreateItem from "./components/CreateItem";
import DeleteItem from "./components/DeleteItem";
import UpdateItem from "./components/UpdateItem";

function App() {
  return (
    <div>
      <ListBasics />
      <hr />
      <CreateItem />
      <hr />
      <DeleteItem />
      <hr />
      <UpdateItem />
    </div>
  );
}

export default App;