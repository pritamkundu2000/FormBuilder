import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login());
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-4 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
