import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/authSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <div>
          <Link to="/" className="mr-4">
            Form Builder
          </Link>
        </div>
        <div>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
