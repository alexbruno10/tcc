import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Orcamento from '../components/orcamento/Orcamento'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/orcamento' component={Orcamento} />
        <Redirect from='*' to='/' />
    </Switch>