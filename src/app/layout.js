import React from 'react'
import './globals.css'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

const Layout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>

    </html>
  )
}

export default Layout