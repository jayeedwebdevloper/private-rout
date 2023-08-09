import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import RouterController from './RouterController/RouterController'
import Home from './Body/Home'
import Cart from './Body/Cart'
import Register from './Account/Register'
import Login from './Account/Login'
import PrivateRouter from './Body/PrivateRouter'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RouterController></RouterController>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/cart',
          element: <PrivateRouter><Cart></Cart></PrivateRouter>
        },
        {
          path: '/signup',
          element: <Register></Register>
        },
        {
          path: '/signin',
          element: <Login></Login>
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
