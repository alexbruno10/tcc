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
    console.log(orcamentos);
  }

  componentDidMount() {
    this.all();
  }

  renderRows() {
    return this.state.list.map((orcamento) => {
      return (
        <tr key={orcamento.id}>
          <td>{orcamento.id}</td>
          <td>{orcamento.descricao}</td>
          <td>{orcamento.unid}</td>
          <td>{orcamento.alt}</td>
          <td>{orcamento.larg}</td>
          <td>{orcamento.valorUnit}</td>
          <td>{orcamento.total}</td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => this.load(orcamento)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(orcamento)}
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
            <th>ID</th>
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
