
import React, { useState } from "react";
import classes from "./Login.module.css";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function Register() {
  

  const[name,setName]=useState("")
  const[name2,setName2]=useState("")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const[dob,setDob]=useState("")

  const [nameError, setNameError] = useState();

  const [emailError, setEmailError] = useState();
  const [PasswordError, setPasswordError] = useState();
  const [ConfirmPasswordError, setConfirmPasswordError] = useState();

  // console.log(emails)
  // console.log(passwords)

  const url = "https://login-reactapi.onrender.com/api/admin/register ";
  const RegisterHandler = async (e) => {
    e.preventDefault();

    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName:name, 
        lastName:name2,  
       email: email,
        password: password,
        confirmPassword:confirm_password,
        dob:dob
      }),
    });

    const res = await response.json();
  
    // if (res.message == "Register Success") {
    //   toast.success(res.message);
    // } else {
    //   toast.error(res.message);
    // }
  };
  const nameHandler = (e) => {
    if (e.target.value == "") {
      setNameError("name cannot be empty");
    } else if (
      e.target.value.length < 2
    ) {
        setNameError(" name should be greater than 2 character");
    } else {
        setNameError("");
        setName(e.target.value);
    }
  };
  const name2Handler = (e) => {

        setName2(e.target.value);
    
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
      setEmail(e.target.value);
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
      setPassword(e.target.value);
    }
  };
  const confirmpasswordHandler = (e) => {
    if (e.target.value == "") {
        setConfirmPasswordError("confirm password cannot be empty");
    } else if (e.target.value !== password) {
        setConfirmPasswordError("not matching");
    } else {
        setConfirmPasswordError("");
      setConfirm_Password(e.target.value);
    }
  };
  const validate = (e) => {
    e.preventDefault();
    if (name == "") {
        setNameError("name should not be empty");
      }
    if (email == "") {
      setEmailError("email should not be empty");
    }
    if (password == "") {
      setPasswordError("password should not be empty");
    } 
    if (confirm_password == "") {
        setConfirmPasswordError("confirm password should not be empty");
      } 
    else {
        setNameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("")
    }

    Full(e);
  };
  const Full = (e) => {
    if (nameError=="" && emailError == "" && PasswordError == "" && ConfirmPasswordError=="") {
      console.log("apio call");
      RegisterHandler(e);
    }
  };
  return (
    <div className={classes.main}>
      <ToastContainer autoClose={2000} />
      <form className={classes.form} onSubmit={validate}>
        <h1>Register</h1>

        <div className={classes.upbtn}>
        <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-helper">Name</InputLabel>
              <Input
                id="component-helper"
                name="email"
                // value={emails}
                onChange={nameHandler}
            
              />
              <FormHelperText
                id="component-helper-text"
                style={{ color: "red" }}
              >
                {nameError}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-helper">LastName</InputLabel>
              <Input
                id="component-helper"
                name="email"
                // value={emails}
                onChange={name2Handler}
            
              />
              <FormHelperText
                id="component-helper-text"
                style={{ color: "red" }}
              >
                {/* {nameError} */}
              </FormHelperText>
            </FormControl>
          </div>
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
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-helper">Confirm_Password</InputLabel>
              <Input
                id="component-helper"
                type="password"
                name="password"
                // value={passwords}
                onChange={confirmpasswordHandler}
            
              />
              <FormHelperText
                id="component-helper-text"
                style={{ color: "red" }}
              >
                {ConfirmPasswordError}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <label>dob</label><br/><br/>
           <Input type="date" onChange={(e)=>{
setDob(e.target.value)
           }}/>
          </div>


          <div>
            <label>File</label><br/><br/>
           <Input type="file" />
          </div>
          

        </div><br/>
        <div className={classes.downbtn}>
          <div className={classes.btn}>
            <Button variant="contained" size="large" type="submit">
             Register
            </Button>
          </div>
          <p>
            have an account<a href="/login">Login</a>
          </p>
        </div>
      </form>
      <div></div>
    </div>
  );
}

export default Register;
