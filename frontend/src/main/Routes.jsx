import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Home from "../components/home/Home";
import Clientes from "../components/clientes/Clientes";
import Orcamento from "../components/orcamento/Orcamento";
import Notas from "../components/notas/Notas";
import Estoque from "../components/estoque/Estoque";
import Pedidos from "../components/pedidos/Pedidos";
import Manutencao from "../components/manutencao/Manutencao";
import Listar from "../components/orcamento/Listar";
import Login from "../components/login/Login";
import loginService from "../services/login";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loginService.isLogged() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default (props) => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute path="/clientes" component={Clientes} />
    <PrivateRoute path="/orcamento" exact component={Listar} />
    <PrivateRoute path="/orcamento/novo" exact component={Orcamento} />
    <PrivateRoute path="/orcamento/:id" component={Orcamento} />
    <PrivateRoute path="/notas" component={Notas} />
    <PrivateRoute path="/estoque" component={Estoque} />
    <PrivateRoute path="/pedidos" component={Pedidos} />
    <PrivateRoute path="/manutencao" component={Manutencao} />
    <Route path="/login" component={Login} />
    <Redirect from="*" to="/" />
  </Switch>
);
