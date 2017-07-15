import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function Header (props) {
  return (
    <div className='header-wrapper'>
      <Link className='header-title' to='/'>
      {props.title}
      </Link>
    </div>
  )
}

function Layout (props) {
  return (
    <div>
      <Header title={'Bloging Platform'} />
      <div>
        <div className='body-container'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
