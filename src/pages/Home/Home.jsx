import { Link } from 'react-router-dom';
import './Home.module.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Movie Booking</h1>
      <div className="auth-buttons">
        <Link to="/login" className="auth-button login">
          Login
        </Link>
        <Link to="/register" className="auth-button register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;