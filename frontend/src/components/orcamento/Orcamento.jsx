import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  icon: "orcamento",
  title: "Orçamentos",
  subtitle: "Realização de orçamentos",
};

const baseUrl = "http://localhost:3001/orcamento"; //definindo a comunicação com o db
const initialState = {
  orcamento: { cliente: "", itens: [] },
  //definindo o estado inicial do formulario
  item: {
    descricao: "",
    unid: "",
    larg: "",
    alt: "",
    valorUnit: "",
    total: "",
  }, //descricao, unid, larg, alt, valorm², total
  list: [],
};

export default class Orcamento extends Component {
  state = { ...initialState }; //chamando o estado inicial
  constructor(props) {
    super(props);
    this.changeCliente = this.changeCliente.bind(this);
  }

  componentWillMount() {
    //trazendo resposta do db, sobre quais usuarios estao cadastrados
    // axios(baseUrl).then((resp) => {
    //   this.setState({ list: resp.data });
    // });
  }

  clear() {
    //limpando o orçamento
    this.setState({ item: initialState.item });
  }

  add() {
    let item = this.state.item;
    const orcamento = this.state.orcamento;
    orcamento.itens.push(item);
    this.setState({ orcamento });
    item = initialState.item;
    this.setState({ item });
  }

  save() {
    const orcamitemento = this.state.orcamento;
    console.log();
    // const method = item.id ? "put" : "post"; //verificando se o o ID é verdadeiro(diferente de 0), se for ele altera, se não, ele acrescenta
    // const url = item.id ? `${baseUrl}/${item.id}` : baseUrl;
    // axios[method](url, item).then((resp) => {
    //   const list = this.getUpdatedList(resp.data);
    //   this.setState({ item: initialState.item, list });
    // });
  }

  getUpdatedList(item, add = true) {
    //realizando um incremento na lista, comparando se o id é diferente dos que já existem, se for, ele coloca na primeira pos9ção
    const list = this.state.list.filter((u) => u.id !== item.id);
    if (add) list.unshift(item);
    return list;
  }

  updateField(event) {
    //atualiza o orçamento
    const item = { ...this.state.item };
    item[event.target.name] = event.target.value;
    this.setState({ item });
    console.log(this.state.item);
  }

  changeCliente(event) {
    const orcamento = this.state.orcamento;
    orcamento.cliente = event.target.value;
    this.setState({ orcamento });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <label>Cliente</label>
              <select
                value={this.state.orcamento.cliente}
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={this.changeCliente}
              >
                <option>Selecione um Cliente</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                className="form-control"
                name="descricao"
                value={this.state.item.descricao}
                onChange={(e) => this.updateField(e)}
                placeholder="Descrição"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Unidade</label>
              <input
                type="number"
                className="form-control"
                name="unid"
                value={this.state.item.unid}
                onChange={(e) => this.updateField(e)}
                placeholder="Informa as unidades"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Largura</label>
              <input
                type="text"
                className="form-control"
                name="larg"
                value={this.state.item.larg}
                onChange={(e) => this.updateField(e)}
                placeholder="Informe a largura"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Altura</label>
              <input
                type="text"
                className="form-control"
                name="alt"
                value={this.state.item.alt}
                onChange={(e) => this.updateField(e)}
                placeholder="Informe a altura"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Valor M²</label>
              <input
                type="text"
                className="form-control"
                name="valorUnit"
                value={this.state.item.valorUnit}
                onChange={(e) => this.updateField(e)}
                placeholder="Valor do m²"
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.add(e)}>
              Add
            </button>

            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(item) {
    this.setState({ item });
  }

  remove(item) {}

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Unidade</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Valor m²</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.orcamento.itens.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.descricao}</td>
          <td>{item.unid}</td>
          <td>{item.alt}</td>
          <td>{item.larg}</td>
          <td>{item.valorUnit}</td>
          <td>{item.alt * item.larg * item.valorUnit}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(item)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(item)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
