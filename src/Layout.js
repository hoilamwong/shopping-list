import React from 'react'
import Header from './Header'
import Footer from './Footer.js'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="App divide-y divide-darkLamon/50 select-none" >
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
