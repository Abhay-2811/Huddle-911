import { NavLink } from "react-router-dom";
import './navbar.css';
export default function Navbar () {


  return (
    <nav>     
          <div> Logo </div>
          <div className="menu-list">
          <ul><NavLink exact to='/'>Home</NavLink></ul>
          <ul><NavLink exact to='/consult'>Consult</NavLink></ul>
          <ul><NavLink exact to='/history'>History</NavLink></ul>
          </div>
    </nav>
  )
}

