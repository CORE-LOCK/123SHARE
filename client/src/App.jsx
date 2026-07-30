import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Home"
import GridGallery from "./GridGallery";

function App() {
  return (<>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/gallery" element={<GridGallery/>}/>
</Routes>
  </>
  );
}
export default App;
