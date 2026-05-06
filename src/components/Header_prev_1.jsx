import { Link, useNavigate, NavLink } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <ul>
        {/* <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/about')}>About</li>
        <li onClick={() => navigate('/contact')}>Contact</li> */}

        {/* <li>Home</li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>Contact</li> */}

        {/* <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li> */}

        <li>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? 'text-blue-700' : '';
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Contact"
            className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
