import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
    </div>
  );
};

export default Auth;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://recipe-website-nu83hag2a-zeros-projects-0a3b826b.vercel.app/auth/login",
        {
          username,
          password,
        }
      );

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
      loginError={loginError}
    />
  );
};

// Form Component
const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
  loginError,
}) => {
  return (
    <div className="auth_container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <div className="from-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="from-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit"> {label} </button>
        <Link to="/register">
          <h4 className="register"> Register? </h4>
        </Link>
      </form>
    </div>
  );
};
