import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import LoginForm from "../../components/Auth/LoginForm";
import Logo from "../../assets/png/shadowfiend.png";
import "./Auth.scss";

export default function Auth() {
  return (
    <Container fluid className="auth">
      <Image src={Logo} />

      <div className="container-form">
        <LoginForm />
      </div>
    </Container>
  );
}
