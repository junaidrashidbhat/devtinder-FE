import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../utils/constants"


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("jbhat388@gmail.com");
  const [password, setPassword] = useState("ninja@123");
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BaseUrl + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      console.log("res----->>>from login", res);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
}

export default Login;
