import React, { useState } from "react";
import "./navbar.css";
import Login from "./login";
import { Link } from "react-router-dom";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div>
        <h1>Instagram</h1>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/post">Post</Link> {/* Updated Link */}
            </li>
            <li>
              <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? "Close Login" : "Login"}
              </button>
              
            </li>
          </ul>
        </div>
      </div>
      {showLogin && <Login />}
    </>
  );
}

export default Navbar;
