import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i> Clientes
            </Link>
            <Link to="/orcamento">
                <i className="fa fa-database"></i> Orçamento
            </Link>
            <Link to="/notas">
                <i className="fa fa-sticky-note"></i> Notas Fiscais
            </Link>
        </nav>
    </aside>