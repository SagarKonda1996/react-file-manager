import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Body from '../Body/Body'
import { BrowserRouter } from 'react-router-dom'

const AppLayout = props => {
    return (
        <BrowserRouter>
          <Header/>
          <Body/>
        </BrowserRouter>
    )
}



export default AppLayout
