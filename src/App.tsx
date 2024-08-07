import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './layouts/Layout'
import { Characters } from './pages/Characters/Characters'
import { GlobalProvider } from './context/GlobalContext'
import { CharacterDetail } from './pages/CharacterDetail/CharacterDetail'

export const App = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout Component={Characters} />,
    },
    {
      path: 'character/:id',
      element: <Layout Component={CharacterDetail} />,
    },
  ])

  return (
    <div className="app__wrapper">
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </div>
  )
}
