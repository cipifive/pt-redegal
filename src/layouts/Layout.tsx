import { FC } from 'react'
import { Navbar } from '../components/shared/Navbar'

export const Layout: FC<any> = (props): JSX.Element => {
  const { Component } = props

  return (
    <div className="layout__wrapper">
      <Navbar />
      <Component />
    </div>
  )
}
