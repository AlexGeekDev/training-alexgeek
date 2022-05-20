import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import routes from "./routes";
import Layout from "../views/layout/Layout";
import Home from "../views/home/Home";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Finder from "../views/Finder/Finder";
import ResetPassword from "../views/auth/ResetPassword";
import Profile from "../views/profile/Profile";
import AboutUs from "../views/aboutUs/AboutUs";
import Policy from "../views/aboutUs/Policy";
import Privacy from "../views/aboutUs/Privacy";

const Paths = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path={routes.home} element={<Home />} />
          <Route exact path={routes.login} element={<Login />} />
          <Route exact path={routes.signup} element={<Register />} />
          <Route exact path={routes.finder} element={<Finder />} />
          <Route exact path={routes.profile} element={<Profile />} />
          <Route exact path={routes.reset} element={<ResetPassword />} />
          <Route exact path={routes.about} element={<AboutUs />} />
          <Route exact path={routes.policy} element={<Policy />} />
          <Route exact path={routes.privacy} element={<Privacy />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Paths;
