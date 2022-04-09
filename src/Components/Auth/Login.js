import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { login } = useAuth();
  const history = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      let user = await login(email, password);
      console.log(user);
      history('/');
    } catch(error) {
      console.log(error);
      alert("Failed to Log in");
    }
  }
  return (
    <>
            <div class="login-form">
                <form onSubmit={(e) => { handleLogin(e) }}>
                    <div class="avatar"><i class="material-icons">&#xE7FF;</i></div>
                    <h4 class="modal-title">Login to Your Account</h4>
                    <div class="form-group">
                        <input type="email" class="form-control" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Address" required="required" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required="required" />
                    </div>
                    <div class="form-group small clearfix">
                        <label class="form-check-label"><input type="checkbox" /> Remember me</label>
                        <a href="#" class="forgot-link">Forgot Password?</a>
                    </div>
                    <input type="submit" style={{ backgroundColor: "#002FA7" }} class="btn btn-defaul btn-block btn-lg" value="Login" />
                </form>
                <div class="text-center small">Don't have an account? <a href="/signup" onClick={() => { history('/signup') }}>Sign up</a></div>
            </div>
        </>
  );
}
