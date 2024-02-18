import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CreateRecipe from "./pages/create-recipe";
import SavedRecipe from "./pages/saved-recipe";
import Navbar from "./components/navbar";
import Auth from "./pages/auth";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipe" element={<SavedRecipe />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
