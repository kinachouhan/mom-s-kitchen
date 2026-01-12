import { Signup } from '../components/Signup'
import { Home } from '../pages/Home'
import { VerifyOtp } from '../pages/VerifyOtp'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { Login } from '../components/Login'
import { Layout } from '../layout/MainLayout'
import { AdminLayout } from '../layout/AdminLayout'
import { AdminAddFooditems } from '../admin/AdminAddFooditems'
import { AdminAddFooditemsList } from '../admin/AdminfooditemsList'
import { AdminAllOrders } from '../admin/AdminAllOrders'
import { Profile } from '../pages/Profile'
import { About } from '../pages/About'
import { Contactus } from '../pages/Contactus'
import { Menu } from '../pages/Menu'
import { OrderPlaced } from '../pages/OrderPlaced'
import { PlaceOrder } from '../pages/PlaceOrder'
import { SingleFooditems } from '../pages/SignleFoodItems'
import { Cart } from '../pages/Cart'
import { Orders } from '../pages/Orders'



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,   
      children: [
        { 
          path: "/",
           element: <Home />
         },
        { 
          path: "/signup", 
          element: <Signup /> 
        },
        {
           path: "/verify-otp", 
           element: <VerifyOtp /> 
        },
        {
           path: "/login", 
           element: <Login /> 
        },
        {
           path: "/profile", 
           element: <Profile/>
        },
        {
           path: "/about", 
           element: <About/>
        },
        {
           path: "/contact", 
           element: <Contactus/>
        },
        {
           path: "/menu", 
           element:<Menu/>
        },
        {
           path: "/order-placed", 
           element: <OrderPlaced/>
        },
        {
           path: "/place-order", 
           element: <PlaceOrder/>
        },
        {
           path: "/single-item", 
           element: <SingleFooditems/>
        },
        {
           path: "/cart", 
           element: <Cart/>
        },
        {
           path: "/orders", 
           element: <Orders/>
        }
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />, 
      children: [
        { path: "", element: <AdminAddFooditems/> }, 
        { path: "list", element: <AdminAddFooditemsList/> }, 
        { path: "all-orders", element: <AdminAllOrders/> }
      ],
    },
  ])

  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </>
  )
}

export default App
