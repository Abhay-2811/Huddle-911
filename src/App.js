import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import History from './pages/History';
import Home from './pages/Home';
import Consult from './pages/Consult';
import Navbar from './components/Navbar';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/'element={<Home></Home>}/>
        <Route exact path='/consult'element={<Consult></Consult>}/>
        <Route exact path='/history'element={<History></History>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
