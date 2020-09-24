import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}


const baseUrl = 'http://localhost:3001/users' //definindo a comunicação com o db
const initialState = { //definindo o estado inicial do formulario
    user: { name: '', email: '', telefone: '', cpf: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState } //chamando o estado inicial

    componentWillMount() { //trazendo resposta do db, sobre quais usuarios estao cadastrados
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() { //limpando o formulario
        this.setState({ user: initialState.user }) //está limpando apenas o user, e nao a lista
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post' //verificando se o o ID é verdadeiro(diferente de 0), se for ele altera, se não, ele acrescenta
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) { //realizando um incremento na lista, comparando se o id é diferente dos que já existem, se for, ele coloca na primeira pos9ção
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    updateField(event) { //atualiza o nome com email
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="tel" className="form-control"
                                name="telefone"
                                value={this.state.user.telefone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o telefone..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control"
                                name="cpf"
                                value={this.state.user.cpf}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CPF..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Cadastrar
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

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>CPF</th>
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
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.telefone}</td>
                    <td>{user.cpf}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
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