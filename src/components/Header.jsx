import { Link, useNavigate } from 'react-router-dom';

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

        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
