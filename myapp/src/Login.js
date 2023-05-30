import React, { useState } from "react";
import classes from "./Login.module.css";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate=useNavigate();

  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");

  const [emailError, setEmailError] = useState();
  const [PasswordError, setPasswordError] = useState();
  // console.log(emails)
  // console.log(passwords)

  const url = "https://login-reactapi.onrender.com/api/admin/login";
  const loginHandler = async (e) => {
    e.preventDefault();

    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emails,

        password: passwords,
      }),
    });

    const res = await response.json();
    // console.log("token", res.data.token);
   if (response.status !== 200) {
    toast.error(res.message);
    console.log(res.message)
    } 

    localStorage.setItem("token",res.data.token)
         navigate('/datatable')
    // if (res.message == "Successfully Logged In") {
    //   toast.success("Login Succesfully");
    // } else {
    //   toast.error(res.message);
    // }
  };

  const emailHandler = (e) => {
    if (e.target.value == "") {
      setEmailError("email cannot be empty");
    } else if (
      !e.target.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailError("email is not valid");
    } else {
      setEmailError("");
      setEmails(e.target.value);
    }
  };
  const passwordHandler = (e) => {
    if (e.target.value == "") {
      setPasswordError("password cannot be empty");
    } else if (e.target.value.length < 8) {
      setPasswordError("password should be atleast 8 character");
    } else if (!e.target.value.match(/[A-Z]/)) {
      setPasswordError("include one capital character");
    } else {
      setPasswordError("");
      setPasswords(e.target.value);
    }
  };
  const validate = (e) => {
    e.preventDefault();

    if (emails == "") {
      setEmailError("email should not be empty");
    }
    if (passwords == "") {
      setPasswordError("password should not be empty");
    } else {
      setEmailError("");
      setPasswordError("");
    }

    Full(e);
  };
  const Full = (e) => {
    if (emailError == "" && PasswordError == "") {
      console.log("apio call");
      loginHandler(e);
    }
  };
  return (
    <div className={classes.main}>
      <ToastContainer autoClose={2000} />
      <form className={classes.form} onSubmit={validate}>
        <h1>Login</h1>

        <div className={classes.upbtn}>
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-helper">Email</InputLabel>
              <Input
                id="component-helper"
                name="email"
                // value={emails}
                onChange={emailHandler}
               
              />
              <FormHelperText
                id="component-helper-text"
                style={{ color: "red" }}
              >
                {emailError}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-helper">Password</InputLabel>
              <Input
                id="component-helper"
                type="password"
                name="password"
                // value={passwords}
                onChange={passwordHandler}
               
              />
              <FormHelperText
                id="component-helper-text"
                style={{ color: "red" }}
              >
                {PasswordError}
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className={classes.downbtn}>
          <div className={classes.btn}>
            <Button variant="contained" size="large" type="submit">
              Login
            </Button>
          </div>
          <p>
            Don't have an account<a href="/Register">Register</a>
          </p>
        </div>
      </form>
      <div></div>
    </div>
  );
}

export default Login;
