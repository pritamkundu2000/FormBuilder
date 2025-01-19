import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
// import AppLayout from './AppLayout.jsx'
import CreateForm from './Components/CreateForm.jsx'
// import FormBuilder from './Components/FormBuilder.jsx'
import FormList from './Components/FormList.jsx'
import ResponseList from './Components/ResponseList.jsx'
import FillForm from './Components/FillForm.jsx'
import Login from './Components/Login.jsx'
import EditForm from './Components/EditForm.jsx'

const customRouter=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<FormList/>}/>
      <Route path='/form/:id' element={<FillForm/>}/>
      <Route path='/responses/:id' element={<ResponseList/>}/>
      <Route path='/edit/:id' element={<EditForm/>}/>
      <Route path='/create' element={<CreateForm/>}/>
      <Route path='/login' element={<Login/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={customRouter}>
      <App/>
    </RouterProvider>
    
  </StrictMode>,
)
