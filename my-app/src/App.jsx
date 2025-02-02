import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Introduction from "./pages/Introduction";
import Customisation from "./pages/Customisation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/introduction" element={<Introduction />} />
      <Route path="/customisation" element={<Customisation />} /> {/* New Page */}
    </Routes>
  );
}

export default App;
