import React, { useState } from "react";
import { Wrapper, Form, Input, Button, Title } from "./LoginElements";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const doTheLogin = async () => {
    console.log(email, password);
    await axios
      .post("http://localhost:4000/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status == 201) {
          console.log(res.data._id);
          localStorage.setItem("auth", true);
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("username", res.data.username);
          console.log("aaaa" + localStorage.getItem("username"));
          history.push("/");
        }
        if (res.status == 402) {
          alert(`Invalid email or password`);
        }
        console.log(res);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    doTheLogin();
  };
  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Title>Welcome</Title>
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            value={email}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
            value={password}
          />
          <Button type="submit">Login</Button>
        </Form>
      </Wrapper>
    </>
  );
};
export default Login;
