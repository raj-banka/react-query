import {useQuery } from "@tanstack/react-query"
import Form from "./Components/Form";


function App() {
  const {data} = useQuery({
    queryKey: ["todo"],
    queryFn : async () => await (await fetch("http://localhost:8000/todo")).json()
  });
  console.log(data);
  return (
    <div className="App">
      <h1>React-Query</h1>
      <Form />
      {
        data && data.data && data.data.map(todo => <li key = {todo.id}>{todo.title}</li>)
      }
    </div>
  );
}

export default App;
