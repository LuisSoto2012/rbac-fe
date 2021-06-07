import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import {
  signInApi,
  getRolesFromUserApi,
  signInWithRoleApi,
} from "../../../api/user";
import jwtDecode from "jwt-decode";
import useAuth from "../../../hooks/useAuth";
import { getAccessTokenApi } from "../../../api/auth";
import "./LoginForm.scss";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [userLogged, setUserLogged] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const { user, isLoading } = useAuth();
  const [userRoles, setUserRoles] = useState([]);
  useEffect(() => {}, [isLogged]);

  const defaultInput = {
    username: "",
    password: "",
    roleId: "",
    roleName: "",
  };

  useEffect(() => {
    async function getRolesFromUserAPI() {
      if (user || userLogged) {
        const accessToken = getAccessTokenApi();
        const { roles } = await getRolesFromUserApi(
          accessToken,
          user ? user.id : userLogged.id
        );
        if (roles.length > 0) {
          const roleArray = [];
          roles.forEach((item) => {
            roleArray.push({
              key: item._id,
              text: item.name,
              value: item.name,
            });
          });
          setUserRoles(roleArray);
        }
      }
    }
    getRolesFromUserAPI();
  }, [user, userLogged]);

  const [inputs, setInputs] = useState(defaultInput);

  const changeForm = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await signInApi(inputs);
    if (result.message) {
      toast.error(result.message);
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      /* Get user from session */
      setUserLogged(jwtDecode(accessToken));
      setIsLogged(true);
      toast.success("Login correcto!");
    }
  };

  const loginWithRole = async (e) => {
    e.preventDefault();
    const accessToken = getAccessTokenApi();
    const data = {
      accessToken: accessToken,
      selectedRole: inputs.roleId,
    };
    const result = await signInWithRoleApi(accessToken, data);
    if (result.message) {
      toast.error(result.message);
    } else {
      toast.success("Usted ha ingresado como " + inputs.roleName);
      window.location.href = "/";
    }
  };

  const handleChangeDropdown = (e, data) => {
    const { value } = data;
    const { key } = data.options.find((o) => o.value === value);
    setInputs({ ...inputs, roleId: key, roleName: value });
  };

  return (
    <>
      {!isLogged && !user ? (
        <Form className="login-form" onSubmit={login}>
          <h2>Ingrese sus credenciales de usuario</h2>
          <Form.Input
            icon="user"
            iconPosition="left"
            type="text"
            placeholder="Usuario"
            name="username"
            onChange={changeForm}
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            type="password"
            placeholder="Contrasena"
            name="password"
            onChange={changeForm}
          />
          <Button type="submit" className="btn-submit">
            Iniciar sesion
          </Button>
        </Form>
      ) : (
        <Form className="auth-role-form" onSubmit={loginWithRole}>
          <h2>
            Bienvenido {user ? user.name : userLogged.name} ! <br></br>
          </h2>
          <h3>Seleccione un rol.</h3>

          <Form.Dropdown
            placeholder="Rol"
            name="role"
            fluid
            selection
            options={userRoles}
            onChange={(e, data) => handleChangeDropdown(e, data)}
          />
          <Button type="submit" className="btn-submit">
            Ingresar
          </Button>
        </Form>
      )}
    </>
  );
}
