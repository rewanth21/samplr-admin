import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './containers/AppRouter'
import configureStore from './store/configureStore'
import { Router, Route, Link } from 'react-router'

const store = configureStore()

render(
    <Provider store={store}>
        {() => <AppRouter/> }
    </Provider>,
    document.getElementById('root')
)
