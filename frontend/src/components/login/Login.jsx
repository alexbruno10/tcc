import React, { Component, useState } from "react";
import axios from "axios";
import Main from "../template/Main";
import loginService from "../../services/login";
import "./login.css";
import logo from "../../assets/imgs/logo.png";
// import { useHistory } from "react-router-dom";

const headerProps = {
  icon: "manutencao",
  title: "Login",
  subtitle: "",
};

const initialState = {
  login: { usuario: "", senha: "" },

  //definindo o estado inicial do formulario
};

export default function Login({ history }) {
  const [login, setLogin] = useState(initialState.login);

  const logar = async (e) => {
    e.preventDefault();
    await loginService.logar(login);
    history.push("/");
    // window.location.href = "/";
  };

  function updateField(e) {
    //atualiza o nome com cliente
    const login = { ...login };
    login[e.target.name] = e.target.value;
    setLogin({ login });
  }

  return (
    <div>
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo Sistema" />
        </div>
        <div className="login-box-body">
          <form acceptCharset="utf-8" onSubmit={(e) => logar(e)}>
            <div className="form-group has-feedback">
              <input
                type="text"
                name="usuario"
                placeholder="Username"
                className="form-control"
                id="usuario"
                value={login.usuario}
                onChange={(e) => updateField(e)}
              />
              <span className="glyphicon glyphicon-user form-control-feedback" />
              <span>
                <font color="red" />
              </span>
            </div>
            <div className="form-group has-feedback">
              <input
                type="password"
                name="senha"
                value={login.senha}
                placeholder="senha"
                className="form-control"
                id="senha"
                onChange={(e) => updateField(e)}
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
              <span>
                <font color="red" />
              </span>
            </div>

            <div className="col-xs-4">
              <button
                type="submit"
                name="submit"
                defaultValue="Logar"
                id="submit"
                className="btn btn-primary btn-block btn-flat"
              >
                Logar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
