import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from '../src/store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/index.jsx'
import  Home  from './components/pages/Home.jsx'
import Signup from './components/pages/Signup.jsx'
import Login from './components/pages/Login.jsx'
import Sentiment from './components/pages/Sentiment.jsx'
import Test from './components/pages/Test.jsx'
import SubTests from './components/pages/SubTests.jsx'
import TestPage from './components/TestPage.jsx'
import Result from './components/pages/Result.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
          path: "/sentiment",
          element: <Sentiment />,
        },
        {
          path: "/tests",
          element: (
            <AuthLayout authentication={true}>
                <TestPage />
            </AuthLayout>
        ),
        children: [
          {
            path: "/tests",
            element: (
              <AuthLayout authentication={true}>
                  <Test />
              </AuthLayout>
            ),
          },
          {
            path: "/tests/:type",
            element: (
            <AuthLayout authentication={true}>
                <SubTests />
            </AuthLayout>
        ),
          },
        ],
        },
        {
          path: "/result/:type",
          element: (
              <AuthLayout authentication={true}>
                  <Result />
              </AuthLayout>
          ),
        },
        {
          path: "/signup",
          element: (
              <AuthLayout authentication={false}>
                  <Signup />
              </AuthLayout>
          ),
        },
        {
          path: "/login",
          element: (
              <AuthLayout authentication={false}>
                  <Login />
              </AuthLayout>
          ),
        },
       


        
       
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>,
)
