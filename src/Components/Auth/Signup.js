import React from "react";
import "./Signup.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";

export default function Signup() {
  const history = useNavigate();
  const { signup } = useAuth();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  async function handlesignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Confirm Password is not same as Password");
      return;
    }
    try {
      let user = await signup(email, password, username);
      console.log(user);
      history("/");
    } catch (error) {
      alert("Failed to create an account " + error);
      console.log(error);
    }
  }

  return (
    <>
        <div class="login-form">
            <form onSubmit={(e)=>{handlesignup(e)}}>
                <div class="avatar"><i class="material-icons">&#xE7FF;</i></div>
                <h4 class="modal-title">Register</h4>
                <div class="form-group">
                    <input class="form-control" onChange={(e)=>{setUsername(e.target.value)}} placeholder="User Name" required="required"/>
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Address" required="required"/>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" required="required"/>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="Confirm Password" required="required"/>
                </div>
                <input type="submit" style={{backgroundColor: "#002FA7"}} class="btn btn-defaul btn-block btn-lg" value="Register"/>
            </form>
            <div class="text-center small">Already have an account? <a href="/login" onClick={(e)=>{history('/login')}}>Login</a></div>
        </div>
        </>
  );
}
