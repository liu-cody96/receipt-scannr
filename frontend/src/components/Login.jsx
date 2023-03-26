import React, { useState } from "react";
import axios from "axios";

export const Login = (props) => {
    const [loginForm, setloginForm] = useState({
      userName: "",
      password: ""
    })

    const logMeIn = (event) => {
      axios({
        method: "POST",
        url:"http://localhost:8000/api/login",
        data:{
          userName: loginForm.userName,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.token)
        props.setProfileData(response.data.username)
      }).catch((error) => {
        if (error.response) {
          alert("Username or password is incorrect")
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        userName: "",
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
            <input onChange={handleChange} type="username" text={loginForm.userName} name="userName" placeholder="Username" value={loginForm.userName} />
            <input onChange={handleChange} type="password" text={loginForm.password} name="password" placeholder="Password" value={loginForm.password} />
          <button onClick={logMeIn}>Submit</button>
        </form>
      </div>
    );
}

export default Login;
