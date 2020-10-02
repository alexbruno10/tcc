import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'ped',
    title: 'Pedidos',
    subtitle: 'Controle na produção de pedidos'
}


const baseUrl = 'http://localhost:3001/pedidos' //definindo a comunicação com o db
const initialState = { //definindo o estado inicial do formulario
    pedidos: { numPedido: '', cliente: '', dataInicio: '', dataTermino: '' },
    list: []
}

export default class Pedidos extends Component {

    state = { ...initialState } //chamando o estado inicial

    componentWillMount() { //trazendo resposta do db, sobre quais usuarios estao cadastrados
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() { //limpando o formulario
        this.setState({ pedidos: initialState.pedidos }) //está limpando apenas o pedidos, e nao a lista
    }

    save() {
        const pedidos = this.state.pedidos
        const method = pedidos.id ? 'put' : 'post' //verificando se o o ID é verdadeiro(diferente de 0), se for ele altera, se não, ele acrescenta
        const url = pedidos.id ? `${baseUrl}/${pedidos.id}` : baseUrl
        axios[method](url, pedidos)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ pedidos: initialState.pedidos, list })
            })
    }

    getUpdatedList(pedidos, add = true) { //realizando um incremento na lista, comparando se o id é diferente dos que já existem, se for, ele coloca na primeira pos9ção
        const list = this.state.list.filter(u => u.id !== pedidos.id)
        if (add) list.unshift(pedidos)
        return list
    }

    updateField(event) { //atualiza o nome com cliente
        const pedidos = { ...this.state.pedidos }
        pedidos[event.target.numPedido] = event.target.value
        this.setState({ pedidos })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Número do pedido</label>
                            <input type="text" className="form-control"
                                numPedido="numPedido"
                                value={this.state.pedidos.numPedido}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o número do pedido" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cliente</label>
                            <input type="text" className="form-control"
                                numPedido="cliente"
                                value={this.state.pedidos.cliente}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o cliente" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data de Início</label>
                            <input type="date" className="form-control"
                                numPedido="dataInicio"
                                value={this.state.pedidos.dataInicio}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe a data de início da produção" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data Prevista de término</label>
                            <input type="date" className="form-control"
                                numPedido="dataTermino"
                                value={this.state.pedidos.dataTermino}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe a data prevista de término" />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Cadastrar pedido
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(pedidos) {
        this.setState({ pedidos })
    }

    remove(pedidos) {
        axios.delete(`${baseUrl}/${pedidos.id}`).then(resp => {
            const list = this.getUpdatedList(pedidos, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Número do pedido</th>
                        <th>Cliente</th>
                        <th>Data Início</th>
                        <th>Data Prevista de Término</th>
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
        return this.state.list.map(pedidos => {
            return (
                <tr key={pedidos.numPedido}>
                    <td>{pedidos.numPedido}</td>
                    <td>{pedidos.cliente}</td>
                    <td>{pedidos.dataInicio}</td>
                    <td>{pedidos.dataTermino}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(pedidos)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(pedidos)}>
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