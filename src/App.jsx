import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CvContainer from "./components/CvContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CvContainer />
    </>
  );
}

export default App;
