import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";
import loginService from "../../services/login";
import "./login.css";
import logo from "../../assets/imgs/logo.png";

const headerProps = {
  icon: "manutencao",
  title: "Login",
  subtitle: "",
};

const initialState = {
  login: { usuario: "", senha: "" },

  //definindo o estado inicial do formulario
};

export default class Login extends Component {
  state = { ...initialState }; //chamando o estado inicial

  componentWillMount() {
    //trazendo resposta do db, sobre quais usuarios estao cadastrados
    loginService.isLogged();
  }

  async logar(e) {
    e.preventDefault();
    await loginService.logar(this.state.login);
    this.props.history.push("/");
  }

  updateField(event) {
    //atualiza o nome com cliente
    const login = { ...this.state.login };
    login[event.target.name] = event.target.value;
    this.setState({ login });
  }

  render() {
    return (
      <Main {...headerProps}>
        <div>
          <div className="login-box">
            <div className="login-logo">
              <img src={logo} alt="Logo Sistema" />
            </div>
            <div className="login-box-body">
              <form acceptCharset="utf-8" onSubmit={(e) => this.logar(e)}>
                <div className="form-group has-feedback">
                  <input
                    type="text"
                    name="usuario"
                    defaultValue
                    placeholder="Username"
                    className="form-control"
                    id="usuario"
                    value={this.state.usuario}
                    onChange={(e) => this.updateField(e)}
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
                    defaultValue
                    placeholder="senha"
                    className="form-control"
                    id="senha"
                    onChange={(e) => this.updateField(e)}
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
      </Main>
    );
  }
}
