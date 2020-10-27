import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import loginService from "../services/login";

import Header from "../components/template/Header";
import Logo from "../components/template/Logo";
import Nav from "../components/template/Nav";
import Routes from "./Routes";
import Footer from "../components/template/Footer";
import Login from "../components/login/Login";

export default (props) => (
  <BrowserRouter>
    {!loginService.isLogged ? (
      <Login />
    ) : (
      <div className="app">
        <Header />
        <Logo />
        <Nav />
        <Routes />
        <Footer />
      </div>
    )}
  </BrowserRouter>
);
