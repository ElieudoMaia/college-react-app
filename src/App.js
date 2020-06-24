import React from 'react'
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes'

import Menu from './components/template/Menu'

export default () => (
    <BrowserRouter>
        <Menu />
        <div className="container">
            <Routes />
        </div>
    </BrowserRouter>
)