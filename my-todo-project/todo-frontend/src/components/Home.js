import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";
import "../styles/Home.css";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to My To-Do App</h1>
      <p>Organize your tasks efficiently. Please login or signup to continue.</p>
      <div className="button-group">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <button className="btn">Go to Dashboard</button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
