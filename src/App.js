import React, { useState } from "react";
import Auth from "./pages/Auth";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  return <>{!auth ? <Auth /> : <h1>Estas logueado</h1>}</>;
}
