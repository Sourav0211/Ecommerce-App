import React, { useState } from "react";
import Layout from "../../components/Layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error while logging in");
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="register">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button
            type="submit"
            className="btn btn-primary m-2"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
