import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'estoque',
  title: 'Estoque',
  subtitle: 'Controle de estoque'
}


const baseUrl = 'http://localhost:3001/estoque' //definindo a comunicação com o db
const initialState = { //definindo o estado inicial do formulario
  estoque: { id: '', equipamento: '', quantidade: ''},  //equipamento, quantidade
  list: []
}

export default class Estoque extends Component {

  state = { ...initialState } //chamando o estado inicial

  componentWillMount() { //trazendo resposta do db, sobre quais usuarios estao cadastrados
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

  clear() { //limpando o orçamento
    this.setState({ estoque: initialState.estoque })
  }

  save() {
    const estoque = this.state.estoque
    const method = estoque.id ? 'put' : 'post' //verificando se o o ID é verdadeiro(diferente de 0), se for ele altera, se não, ele acrescenta
    const url = estoque.id ? `${baseUrl}/${estoque.id}` : baseUrl
    axios[method](url, estoque)
      .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({ estoque: initialState.estoque, list })
      })
  }

  getUpdatedList(estoque, add = true) { //realizando um incremento na lista, comparando se o id é diferente dos que já existem, se for, ele coloca na primeira pos9ção
    const list = this.state.list.filter(u => u.id !== estoque.id)
    if (add) list.unshift(estoque)
    return list
  }

  updateField(event) { //atualiza o orçamento
    const estoque = { ...this.state.name }
    estoque[event.target.estoque] = event.target.value
    this.setState({ estoque })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Equipamento</label>
              <input type="text" className="form-control"
                name="equipamento"
                value={this.state.estoque.equipamento}
                onChange={e => this.updateField(e)}
                placeholder="Informe o equipamento" />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Quantidade</label>
              <input type="number" className="form-control"
                name="quantidade"
                value={this.state.estoque.quantidade}
                onChange={e => this.updateField(e)}
                placeholder="Informe a quantidade" />
            </div>
          </div>

        </div>
        
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary"
              onClick={e => this.save(e)}>Cadastrar Equipamento</button>

            <button className="btn btn-secondary ml-2"
              onClick={e => this.clear(e)}>
              Cancelar
                        </button>
          </div>
        </div>
      </div>
    )
  }

  load(estoque) {
    this.setState({ estoque })
  }

  remove(estoque) {
    axios.delete(`${baseUrl}/${estoque.id}`).then(resp => {
      const list = this.getUpdatedList(estoque, false)
      this.setState({ list })
    })
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Equipamento</th>
            <th>Quantidade</th>
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
    return this.state.list.map(estoque => {
      return (
        <tr key={estoque.equipamento}>
          <td>{estoque.equipamento}</td>
          <td>{estoque.quantidade}</td>
          <td>
            <button className="btn btn-warning"
              onClick={() => this.load(estoque)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2"
              onClick={() => this.remove(estoque)}>
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