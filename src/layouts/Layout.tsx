import { FC } from 'react'
import { Navbar } from '../components/shared/Navbar'
import { PropsLayout } from '../models/shared'

export const Layout: FC<PropsLayout> = (props): JSX.Element => {
  const { Component } = props

  return (
    <div className="layout__wrapper">
      <Navbar />
      <Component />
    </div>
  )
}
