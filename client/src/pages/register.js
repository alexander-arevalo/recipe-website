import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Auth = () => {
  return (
    <div className="auth">
      <Register />
    </div>
  );
};

export default Auth;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("recipe-website-api.vercel.app/auth/register", {
        username,
        password,
      });
      enqueueSnackbar("Account Created Succesfully", { variant: "success" });
      // alert("Registration Completed!");
      navigate("/auth");
    } catch (error) {
      console.error(error);
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        enqueueSnackbar(errorMessage, { variant: "error" });
      } else {
        enqueueSnackbar("An error occurred", { variant: "error" });
      }
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
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
}) => {
  return (
    <div className="auth_container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
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
        <Link to="/auth">
          <h4 className="register"> Login? </h4>
        </Link>
      </form>
    </div>
  );
};
