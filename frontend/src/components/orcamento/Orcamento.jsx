import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'orcamento',
  title: 'Orçamentos',
  subtitle: 'Realização de orçamentos'
}


const baseUrl = 'http://localhost:3001/orcamento' //definindo a comunicação com o db
const initialState = { //definindo o estado inicial do formulario
  orcamento: { id: '', descricao: '', unid: '', larg: '', alt: '', valorUnit: '', total: '' },  //descricao, unid, larg, alt, valorm², total
  list: []
}

export default class Orcamento extends Component {

  state = { ...initialState } //chamando o estado inicial

  componentWillMount() { //trazendo resposta do db, sobre quais usuarios estao cadastrados
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

  clear() { //limpando o orçamento
    this.setState({ orcamento: initialState.orcamento })
  }

  save() {
    const orcamento = this.state.orcamento
    const method = orcamento.id ? 'put' : 'post' //verificando se o o ID é verdadeiro(diferente de 0), se for ele altera, se não, ele acrescenta
    const url = orcamento.id ? `${baseUrl}/${orcamento.id}` : baseUrl
    axios[method](url, orcamento)
      .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({ orcamento: initialState.orcamento, list })
      })
  }

  getUpdatedList(orcamento, add = true) { //realizando um incremento na lista, comparando se o id é diferente dos que já existem, se for, ele coloca na primeira pos9ção
    const list = this.state.list.filter(u => u.id !== orcamento.id)
    if (add) list.unshift(orcamento)
    return list
  }

  updateField(event) { //atualiza o orçamento
    const orcamento = { ...this.state.name }
    orcamento[event.target.orcamento] = event.target.value
    this.setState({ orcamento })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Descrição</label>
              <input type="text" className="form-control"
                name="descricao"
                value={this.state.orcamento.descricao}
                onChange={e => this.updateField(e)}
                placeholder="Descrição" />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Unidade</label>
              <input type="number" className="form-control"
                name="unid"
                value={this.state.orcamento.unid}
                onChange={e => this.updateField(e)}
                placeholder="Informa as unidades" />
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Largura</label>
              <input type="text" className="form-control"
                name="larg"
                value={this.state.orcamento.larg}
                onChange={e => this.updateField(e)}
                placeholder="Informe a largura" />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Altura</label>
              <input type="text" className="form-control"
                name="alt"
                value={this.state.orcamento.alt}
                onChange={e => this.updateField(e)}
                placeholder="Informe a altura" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Valor M²</label>
              <input type="text" className="form-control"
                name="valorUnit"
                value={this.state.orcamento.valorUnit}
                onChange={e => this.updateField(e)}
                placeholder="Valor do m²" />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary"
              onClick={e => this.save(e)}>Cadastrar</button>

            <button className="btn btn-secondary ml-2"
              onClick={e => this.clear(e)}>
              Cancelar
                        </button>
          </div>
        </div>
      </div>
    )
  }

  load(orcamento) {
    this.setState({ orcamento })
  }

  remove(orcamento) {
    axios.delete(`${baseUrl}/${orcamento.id}`).then(resp => {
      const list = this.getUpdatedList(orcamento, false)
      this.setState({ list })
    })
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Unidade</th>
            <th>Altura</th>
            <th>Largura</th>
            <th>Valor m²</th>
            <th>Total</th>
            <th>Ações</th>

          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows() {
    return this.state.list.map(orcamento => {
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
            <button className="btn btn-warning"
              onClick={() => this.load(orcamento)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2"
              onClick={() => this.remove(orcamento)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}