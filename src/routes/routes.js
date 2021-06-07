//Layout
import Layout from "../layouts/Layout";

//Pages
import Login from "../pages/Auth/Auth";
import Home from "../pages/Home";

//Other
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/",
    component: Layout,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/login",
        component: Login,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
