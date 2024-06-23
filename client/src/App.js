import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import About from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/policy' element={<Policy/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='*' element={<Pagenotfound/>}></Route>
      </Routes>
    </>
  );
}

export default App;
