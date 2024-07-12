import "./auth.css";

// ** React Imports
import { useState } from "react";

// ** Custom Components
import Login from "./login";
import Register from "./register";

// ** Icons
import { CiLogin } from "react-icons/ci";
import { FaRegRegistered } from "react-icons/fa";

const Auth = () => {
  const [isOnLogin, setIsOnLogin] = useState(true);

  return (
    <div className="auth">
      {/* Select Page */}
      <div className="container">
        <div className="tabs">
          <button
            className={isOnLogin ? "active" : ""}
            onClick={() => setIsOnLogin(true)}
          >
            <CiLogin />
            Login
          </button>
          <button
            className={isOnLogin ? "" : "active"}
            onClick={() => setIsOnLogin(false)}
          >
            <FaRegRegistered />
            Register
          </button>
        </div>

        <div className="content">
          {isOnLogin ? <Login /> : <Register setIsOnLogin={setIsOnLogin} />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
