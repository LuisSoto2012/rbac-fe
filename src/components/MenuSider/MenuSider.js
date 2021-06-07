import React, { useState, useEffect } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import {
  Sidebar,
  Menu,
  Segment,
  Icon,
  Header,
  Container,
} from "semantic-ui-react";

import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location, routes, modules } = props;
  console.log(modules);
  return (
    <Sidebar.Pushable as={Segment} className="menu-sider">
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        visible
        inverted
        vertical
        width="thin"
      >
        {modules.map((item) => (
          <Menu.Item as="a" key={item._id}>
            <Icon name={item.icon} />
            {item.name}
            {item.submodules.length > 0 && (
              <Menu.Menu>
                {item.submodules.map((itemS) => (
                  <Menu.Item
                    name={itemS.name}
                    active
                    key={itemS._id}
                    // onClick={}
                  ></Menu.Item>
                ))}
              </Menu.Menu>
            )}
          </Menu.Item>
        ))}
      </Sidebar>
      <Sidebar.Pusher>
        <Container className="menu-sider__content">
          <LoadRoutes routes={routes} />
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}

export default withRouter(MenuSider);
