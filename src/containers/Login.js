import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";


export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userHasAuthenticated } = useAppContext();

  
  function validateForm(){
    return email.legnth > 0 && password.length > 0;
  }

  async function handleSubmit(event){
    event.preventDefault();

    try{
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
    } catch (e){
      alert(e.message);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button block bsSize="large" disable={!validateForm} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}