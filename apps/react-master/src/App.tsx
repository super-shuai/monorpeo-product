import React from 'react'
import {Provider} from 'react-redux'
import { store } from "@/store";
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { router } from './router'

const Routers = () => useRoutes(router)

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routers />
      </Provider>
    </BrowserRouter>
  )
}
