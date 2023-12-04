import Todo from "./components/Todo";
import "./App.css";

const API_KEY = "y-iBotWD_TcEiGRB8nuHLaod8WnWJfJFuWPOaSUerjG6hPwl7A";

const App = () => {
  const onFormSubmit = (e,tasks) => {
    e.preventDefault();
    fetch("https://crudapi.co.uk/api/v1/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([{tasks}]),
    }).then((res) => {
      if (!res.ok) throw new Error("Invalid");
      return res.json();
    });
  };

  return (
    <div>
      <Todo onFormSubmit={onFormSubmit} />
    </div>
  );
};

export default App;
