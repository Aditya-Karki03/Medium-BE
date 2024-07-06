import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signin from './pages/Signin.tsx'
import Signup from './pages/Signup.tsx'
import Blogs from './pages/Blogs.tsx'

const routes=createBrowserRouter([
  {
    path:'/',
    element:<Signin/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/blog/:id',
    element:<Blogs/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={routes}/>
  </React.StrictMode>,
)
