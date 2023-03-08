import React, { useState } from "react";
import axios from "axios";

export const Login = (props) => {
    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    const logMeIn = (event) => {
      axios({
        method: "POST",
        url:"http://localhost:8000/user/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
        props.setProfileData(response.data.username)
      }).catch((error) => {
        if (error.response) {
          alert("Username or password is incorrect")
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    const handleChange = (event) => { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h1>Login</h1>
          <form className="login">
            <input onChange={handleChange} type="email" text={loginForm.email} name="email" placeholder="Email" value={loginForm.email} />
            <input onChange={handleChange} type="password" text={loginForm.password} name="password" placeholder="Password" value={loginForm.password} />
          <button onClick={logMeIn}>Submit</button>
        </form>
      </div>
    );
}

export default Login;
