import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import ConnectedRoot from './components/root'

render(
  <Provider store={store}>
    <ConnectedRoot />
  </Provider>,
  document.getElementById('main')
)
