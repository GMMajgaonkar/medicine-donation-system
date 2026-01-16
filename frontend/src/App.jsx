import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Navbar  from './component/Navbar'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import Home from './component/home'
import { Addmedicine } from './component/Addmedicine'
import { Getbyid } from './component/Getbyid'
import { Updatemedicine } from './component/Updatemedicin'
import Alogin from './admin/Alogin'
import { Application } from './admin/Application'
import { Statusupdate } from './admin/Statusupdate'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/addmedicine' element={<Addmedicine/>}></Route>
          <Route path='/getbyid' element={<Getbyid/>}></Route>
          <Route path='/update/:id' element={<Updatemedicine/>}></Route>
          <Route path='/Alogin' element={<Alogin/>}></Route>
          <Route path='/Application' element={<Application/>}></Route>
          <Route path='/Status/:id' element={<Statusupdate/>}></Route>





        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
