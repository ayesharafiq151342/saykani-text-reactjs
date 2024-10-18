import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Login from "./login";
import Post from "./Post";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/post" element={<Post />} /> {/* Updated to proper route */}
      </Routes>
    </Router>
  );
}

export default App;
