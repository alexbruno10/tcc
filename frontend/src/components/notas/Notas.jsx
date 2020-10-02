import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'notas',
  title: 'Notas Fiscais',
  subtitle: 'Controle de notas fiscais'
}


const baseUrl = 'http://localhost:3001/notas' //definindo a comunicação com o db
const initialState = { //definindo o estado inicial do formulario
  notas: { id: '', numNota: '', emissor: ''},  //numNota, emissor, larg, alt, valorm², total
  list: []
}

export default class Notas extends Component {

  state = { ...initialState } //chamando o estado inicial

  componentWillMount() { //trazendo resposta do db, sobre quais usuarios estao cadastrados
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

  clear() { //limpando o orçamento
    this.setState({ notas: initialState.notas })
  }

  save() {
    const notas = this.state.notas
    const method = notas.id ? 'put' : 'post' //verificando se o o ID é verdadeiro(diferente de 0), se for ele altera, se não, ele acrescenta
    const url = notas.id ? `${baseUrl}/${notas.id}` : baseUrl
    axios[method](url, notas)
      .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({ notas: initialState.notas, list })
      })
  }

  getUpdatedList(notas, add = true) { //realizando um incremento na lista, comparando se o id é diferente dos que já existem, se for, ele coloca na primeira pos9ção
    const list = this.state.list.filter(u => u.id !== notas.id)
    if (add) list.unshift(notas)
    return list
  }

  updateField(event) { //atualiza o orçamento
    const notas = { ...this.state.name }
    notas[event.target.notas] = event.target.value
    this.setState({ notas })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Número da NFC-e</label>
              <input type="text" className="form-control"
                name="numNota"
                value={this.state.notas.numNota}
                onChange={e => this.updateField(e)}
                placeholder="Informe o número da nota fiscal" />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Emissor</label>
              <input type="text" className="form-control"
                name="emissor"
                value={this.state.notas.emissor}
                onChange={e => this.updateField(e)}
                placeholder="Emissor da NFC-e" />
            </div>
          </div>

        </div>
        
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary"
              onClick={e => this.save(e)}>Cadastrar NFC-e</button>

            <button className="btn btn-secondary ml-2"
              onClick={e => this.clear(e)}>
              Cancelar
                        </button>
          </div>
        </div>
      </div>
    )
  }

  load(notas) {
    this.setState({ notas })
  }

  remove(notas) {
    axios.delete(`${baseUrl}/${notas.id}`).then(resp => {
      const list = this.getUpdatedList(notas, false)
      this.setState({ list })
    })
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número da NFC-e</th>
            <th>Emissor</th>
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
    return this.state.list.map(notas => {
      return (
        <tr key={notas.id}>
          <td>{notas.id}</td>
          <td>{notas.numNota}</td>
          <td>{notas.emissor}</td>
          <td>
            <button className="btn btn-warning"
              onClick={() => this.load(notas)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2"
              onClick={() => this.remove(notas)}>
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