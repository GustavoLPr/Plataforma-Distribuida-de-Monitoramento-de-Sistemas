import { useState } from "react";
import GlobalView from "./pages/globalView/GlobalView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndividualView from "./pages/individualView/IndividualView";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndividualView />} />
        <Route path="/global" element={<GlobalView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
