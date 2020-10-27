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

export default (props) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/clientes" component={Clientes} />
    <Route path="/orcamento" exact component={Listar} />
    <Route path="/orcamento/novo" exact component={Orcamento} />
    <Route path="/orcamento/:id" component={Orcamento} />
    <Route path="/notas" component={Notas} />
    <Route path="/estoque" component={Estoque} />
    <Route path="/pedidos" component={Pedidos} />
    <Route path="/manutencao" component={Manutencao} />
    <Redirect from="*" to="/" />
  </Switch>
);
