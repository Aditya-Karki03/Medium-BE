import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signin from './pages/Signin.tsx'
import Signup from './pages/Signup.tsx'
import Blogs from './pages/Blogs.tsx'
import Blog from './pages/Blog.tsx'
import BlogPublisher from './pages/BlogPublisher.tsx'
import FullBlog from './Components/FullBlog.tsx'
import appStore from './utils/appstore.ts'

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
    path:'/signin',
    element:<Signin/>
  },
  {
    path:'/blogs/bulk',
    element:<Blogs/>,
    
  },
  {
    path:'/blogs/createBlog',
    element:<BlogPublisher/>
  },
  {
    path:'/blogs/fullblog/:id',
    element:<FullBlog/>
  },
  {
    path:'/blog/:id',
    element:<Blog/>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={appStore}>
        <RouterProvider router={routes}/>
      </Provider>
  </React.StrictMode>,
)
