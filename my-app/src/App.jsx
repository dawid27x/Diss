import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Introduction from "./pages/Introduction";
import Customisation from "./pages/Customisation";
import UICustomisation from "./pages/UICustomisation";
import AdvancedSettings from "./pages/AdvancedSettings";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/introduction" element={<Introduction />} />
      <Route path="/customisation" element={<Customisation />} />
      <Route path="/uicustomisation" element={<UICustomisation/>}></Route>
      <Route path="/advancedsettings" element={<AdvancedSettings/>}></Route>
      <Route path="/chatbot" element={<Chatbot/>}></Route>
    </Routes>
  );
}

export default App;
