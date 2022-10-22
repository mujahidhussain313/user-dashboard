import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Register from './components/Register';
import {Routes, Route} from 'react-router-dom';
import Update from './components/Update';
import Detail from './components/Detail';


function App() {
  return (
    <>
    <NavBar />
    <Routes>
    <Route path='/' element={<Home />}/> 
    <Route path='/register' element={ <Register />}/>
    <Route path='/update/:id' element={ <Update />}/>
    <Route path='/view/:id' element={ <Detail />}/> 
    
    </Routes>
    </>
  );
}

export default App;
