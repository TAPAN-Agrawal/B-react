import { Routes, Route } from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import Datatable from "./Datatable";
function App() {
  return (
    <div>
       <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/datatable" element={<Datatable/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
