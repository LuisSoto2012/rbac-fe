import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container, Sidebar } from "semantic-ui-react";
import MenuSider from "../components/MenuSider";
import Login from "../pages/Auth/Auth";
import useAuth from "../hooks/useAuth";
import { getAccessTokenApi } from "../api/auth";
import { getModulesApi } from "../api/module";

export default function Layout(props) {
  const { routes } = props;
  const { user, isLoading } = useAuth();
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [listModules, setListModules] = useState([]);

  useEffect(() => {
    async function getModulesAPI() {
      const accessToken = getAccessTokenApi();
      const { modules } = await getModulesApi(accessToken);
      setListModules(modules);
    }
    getModulesAPI();
  }, []);

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <>
        {/* <Header/> */}
        <MenuSider
          menuCollapsed={menuCollapsed}
          routes={routes}
          modules={listModules}
        />
      </>
    );
  }

  return null;
}
