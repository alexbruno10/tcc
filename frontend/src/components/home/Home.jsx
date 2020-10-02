import React from 'react'
import Main from '../template/Main'
import pedraslider from '../../assets/imgs/pedraslider.gif'
import '../home/Home.css'

export default props =>
    <Main icon="home" title="Início">
        <div className="centralizar">
        <img className="centralizarLogo" src={pedraslider} width="170px" alt="Pedras Líder"/>
        <hr />
        <p className="mb-1 centralizarImg"><strong>Pedras Decorativas Líder LTDA</strong></p>  
        </div>   
    </Main>