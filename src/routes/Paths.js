import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import routes from "./routes";
import Layout from "../views/layout/Layout";
import Home from "../views/home/Home";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

const Paths = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path={routes.home} element={<Home />} />
          <Route exact path={routes.login} element={<Login />} />
          <Route exact path={routes.signup} element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Paths;
