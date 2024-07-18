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
import Profile from './Components/Profile.tsx'
import Bookmarks from './Components/Bookmarks.tsx'
import LikedPost from './Components/LikedPost.tsx'
import Protected from './Components/ProtectedRoute.tsx'

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
    path:'/user/profile',
    element:<Protected Props={Profile}/>
  },
  {
    path:'/user/bookmarks',
    element:<Protected Props={Bookmarks}/>
  },
  {
    path:'/blogs/bulk',
    element:<Protected Props={Blogs}/>,
    
  },
  {
    path:'/user/likedPost',
    element:<Protected Props={LikedPost}/>
  },
  {
    path:'/blogs/createBlog',
    element:<Protected Props={BlogPublisher}/>
  },
  {
    path:'/blogs/fullblog/:id',
    element:<Protected Props={FullBlog}/>
  },
  {
    path:'/blog/:id',
    element:<Protected Props={Blog}/>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={appStore}>
        <RouterProvider router={routes}/>
      </Provider>
  </React.StrictMode>,
)
