import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/clientes">
                <i className="fa fa-users"></i> Clientes
            </Link>
            <Link to="/orcamento">
                <i className="fa fa-database"></i> Orçamento
            </Link>
            <Link to="/notas">
                <i className="fa fa-sticky-note"></i> Notas Fiscais
            </Link>
            <Link to="/estoque">
                <i className="fa fa-home"></i> Estoque
            </Link>
            <Link to="/pedidos">
                <i className="fa fa-home"></i> Controle de Pedidos
            </Link>
            <Link to="/manutencao">
                <i className="fa fa-home"></i> Controle de manutenção
            </Link>
        </nav>
    </aside>