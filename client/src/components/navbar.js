import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../components/navbar.css";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <img src="logo.png" alt="open book" className="navbar-logo" />
      <Link to={"/"}>
        <h3
          className={`navbar_link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </h3>
      </Link>
      <Link to={"/create-recipe"}>
        <h3
          className={`navbar_link ${
            location.pathname === "/create-recipe" ? "active" : ""
          }`}
        >
          Create Recipe
        </h3>
      </Link>
      {!cookies.access_token ? (
        <Link to={"/auth"}>
          <h3
            className={`navbar_link ${
              location.pathname === "/auth" ? "active" : ""
            }`}
          >
            Login
          </h3>
        </Link>
      ) : (
        <>
          <Link to={"/saved-recipe"}>
            <h3
              className={`navbar_link ${
                location.pathname === "/saved-recipe" ? "active" : ""
              }`}
            >
              Saved Recipe
            </h3>
          </Link>
          <button onClick={logout} className="btn btn-logout">
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
