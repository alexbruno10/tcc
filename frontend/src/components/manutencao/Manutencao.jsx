import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'manutencao',
    title: 'Manutenção',
    subtitle: 'Manutenção de equipamentos'
}


const baseUrl = 'http://localhost:3001/manutencao' //definindo a comunicação com o db
const initialState = { //definindo o estado inicial do formulario
    manutencao: { equipamento: '', tecnico: '', descricao: '', contatoTecnico: '' },
    list: []
}

export default class Manutencao extends Component {

    state = { ...initialState } //chamando o estado inicial

    componentWillMount() { //trazendo resposta do db, sobre quais usuarios estao cadastrados
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() { //limpando o formulario
        this.setState({ manutencao: initialState.manutencao }) //está limpando apenas o manutencao, e nao a lista
    }

    save() {
        const manutencao = this.state.manutencao
        const method = manutencao.id ? 'put' : 'post' //verificando se o o ID é verdadeiro(diferente de 0), se for ele altera, se não, ele acrescenta
        const url = manutencao.id ? `${baseUrl}/${manutencao.id}` : baseUrl
        axios[method](url, manutencao)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ manutencao: initialState.manutencao, list })
            })
    }

    getUpdatedList(manutencao, add = true) { //realizando um incremento na lista, comparando se o id é diferente dos que já existem, se for, ele coloca na primeira pos9ção
        const list = this.state.list.filter(u => u.id !== manutencao.id)
        if (add) list.unshift(manutencao)
        return list
    }

    updateField(event) { //atualiza o nome com tecnico
        const manutencao = { ...this.state.manutencao }
        manutencao[event.target.equipamento] = event.target.value
        this.setState({ manutencao })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Equipamento</label>
                            <input type="text" className="form-control"
                                equipamento="equipamento"
                                value={this.state.manutencao.equipamento}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o equipamento (Computador, Makita, Lixadeira, etc.)" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Técnico</label>
                            <input type="text" className="form-control"
                                equipamento="tecnico"
                                value={this.state.manutencao.tecnico}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o técnico ou empresa que prestará o serviço" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control"
                                equipamento="descricao"
                                value={this.state.manutencao.descricao}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe a descrição do problema ocorrido" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Contato</label>
                            <input type="text" className="form-control"
                                equipamento="contatoTecnico"
                                value={this.state.manutencao.contatoTecnico}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o contato do técnico" />
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

    load(manutencao) {
        this.setState({ manutencao })
    }

    remove(manutencao) {
        axios.delete(`${baseUrl}/${manutencao.id}`).then(resp => {
            const list = this.getUpdatedList(manutencao, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Equipamento</th>
                        <th>Técnico</th>
                        <th>Descrição</th>
                        <th>Contato</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(manutencao => {
            return (
                <tr key={manutencao.equipamento}>
                    <td>{manutencao.equipamento}</td>
                    <td>{manutencao.tecnico}</td>
                    <td>{manutencao.descricao}</td>
                    <td>{manutencao.contatoTecnico}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(manutencao)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(manutencao)}>
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