import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import './App.css'
import { Layout } from "./layouts/Layout";
import { Characters } from './pages/Characters/Characters'

export const App = ():JSX.Element => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout Component={Characters} />
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

  return (
    <div className="app__wrapper">
      <RouterProvider router={router} />
    </div>
    
  )
}
