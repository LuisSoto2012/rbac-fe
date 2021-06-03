import React from "react";
import { Form, Button } from "semantic-ui-react";
import "./LoginForm.scss";

export default function LoginForm() {
  return (
    <Form className="login-form">
      <h2>Ingrese sus credenciales de usuario</h2>
      <Form.Input
        icon="user"
        iconPosition="left"
        type="text"
        placeholder="Usuario"
        name="username"
      />
      <Form.Input
        icon="lock"
        iconPosition="left"
        type="password"
        placeholder="Contrasena"
        name="password"
      />
      <Button type="submit" className="btn-submit">
        Iniciar sesion
      </Button>
    </Form>
  );
}
