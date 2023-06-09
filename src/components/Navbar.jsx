import { NavLink } from "react-router-dom";
import './navbar.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from "@fortawesome/free-solid-svg-icons";



export default function Navbar () {


  return (
    <nav>     
          <img src='logo.ico' alt="logo" className="logo"/>
          <div className="menu-list">
          <ul><NavLink exact activeClassName="active" to='/' >Home</NavLink></ul>
          <ul><NavLink exact to='/consult'>Consult</NavLink></ul>
          <ul><NavLink exact to='/history'>History</NavLink></ul>
          <ul><NavLink exact to='/addDoc'>Become Affiliated Huddle-911 Doctor</NavLink></ul>
          <ul><NavLink exact to='/notifications'><FontAwesomeIcon icon={faBell} size="xl"/></NavLink></ul>
          </div>
          
          <ConnectButton chainStatus="icon" showBalance={false}/>
    </nav>
  )
}

