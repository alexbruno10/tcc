import Main from "../template/Main";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import orcamentoService from "../../services/orcamento";

const headerProps = {
  icon: "orcamento",
  title: "Listar Orçamento",
  subtitle: "",
};

const initialState = {
  //definindo o estado inicial do formulario
  orcamento: {
    id: "",
    descricao: "",
    unid: "",
    larg: "",
    alt: "",
    valorUnit: "",
    total: "",
  }, //descricao, unid, larg, alt, valorm², total
  list: [],
};

export default class Listar extends Component {
  state = { ...initialState }; //chamando o estado inicial

  async all() {
    const orcamentos = await orcamentoService.all();
    this.setState({ list: orcamentos });
  }

  async remove(id) {
    const orcamentos = await orcamentoService.remove(id);
    this.all();
  }

  componentDidMount() {
    this.all();
  }

  renderRows() {
    return this.state.list.map((orcamento) => {
      const total = orcamento.itens.reduce((accumulator, currentValue) => {
        return (
          accumulator +
          currentValue.alt * currentValue.larg * currentValue.valorUnit
        );
      }, 0);

      return (
        <tr key={orcamento.id}>
          <td>{orcamento.cliente.name}</td>
          <td>{orcamento.data}</td>
          <td>
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </td>
          <td>
            <Link to={"/orcamento/" + orcamento.id} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(orcamento.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }
  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  render() {
    return (
      <Main {...headerProps}>
        <Link to={"/orcamento/novo"} className="btn btn-primary">
          Novo
        </Link>
        {/* <button className="btn btn-primary">Novo</button> */}
        {this.renderTable()}
      </Main>
    );
  }
}
