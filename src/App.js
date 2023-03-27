import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
// import About from './components/About';
import Home  from './components/Home';
import Notestate from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <>
    <Notestate>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className='container'>
<Routes>
<Route path="/" element={<Home  showAlert={showAlert} />}>
      </Route>
      {/* <Route exact path=''>
        
      </Route> */}
      {/* <Route path="/about" element={<About showAlert={showAlert} />}>
      </Route> */}
      <Route path="/login" element={<Login  showAlert={showAlert} />}>
      </Route>
      <Route path="/signup" element={<Signup  showAlert={showAlert} />}>
      </Route>
      </Routes>
      </div>
    </Router>
    </Notestate>
      </>
  );
}

export default App;
