import { useState } from "react";
import "./App.css";
// Components for each page
import AppRouter from "./router/AppRouter";

function App() {
  const [username, setUsername] = useState('');

  return (
    <AppRouter username={username} setUsername={setUsername}/>
  );
}

export default App;
