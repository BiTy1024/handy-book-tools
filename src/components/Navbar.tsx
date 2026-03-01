import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-logo">
        📚 HandyBookTools
      </NavLink>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/tools" className={({ isActive }) => isActive ? 'active' : ''}>
          Tools
        </NavLink>
        <NavLink to="/kontakt" className={({ isActive }) => isActive ? 'active' : ''}>
          Kontakt
        </NavLink>
      </nav>
    </header>
  )
}
