import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import AuthProvider from "./providers/AuthProvider";
import Navigation from "./routes/Navigation";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  return (
    <AuthProvider>
      {!auth ? <Auth /> : <Navigation />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
}
