import { Signup } from '../components/Signup'
import { Home } from '../pages/Home'
import './App.css'
import {createBrowserRouter , RouterProvider} from "react-router-dom"

function App() {
  
  const router = createBrowserRouter([
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/signup",
        element: <Signup/>
      },
  ])

  return (
      <RouterProvider router={router}/>
  )
}

export default App
