import "./Main.css";
import React from "react";
// import Header from "./Header";
import Header from "../template/Header";
import Logo from "../template/Logo";
import Nav from "../template/Nav";
import Footer from "../template/Footer";

export default (props) => (
  <React.Fragment>
    <Header />
    <Logo />
    <Nav />
    <main className="content container-fluid">
      <div className="p-3 mt-3">{props.children}</div>
    </main>
    <Footer />
  </React.Fragment>
);
