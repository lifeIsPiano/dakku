import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { ScrollToTop } from './helpers/helpers';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import All from './views/All';
import Tips from './views/Tips';
import Recommend from './views/Recommend';
import Challenge from './views/Challenge';
import LikesList from './views/LikesList';
import MyProfile from './views/MyProfile';
import SignUpPage from './views/SignUpPage';
import LoginPage from './views/LoginPage';
import JoinByMailView from './views/JoinByMailView';
import './App.css'

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className='wrapper'>
        <Navbar />
        <section className='main'>
            <SideMenu />
            <Routes>
              <Route path='/' element={<All />}/>
              <Route path='/tips' element={<Tips />}/>
              <Route path='/recommend' element={<Recommend />}/>
              <Route path='/challenge' element={<Challenge />}/>
              <Route path='/likes' element={<LikesList />}/>
              <Route path='/my-profile' element={user ? <MyProfile /> : <Navigate to="/" replace={true} />}/>
              <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to="/" replace={true} />}/>
              <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" replace={true} />}/>
              <Route path='/signup/bymail' element={!user ? <JoinByMailView /> : <Navigate to="/" replace={true} />}/>
            </Routes>
        </section>
      </div>
    </BrowserRouter>
  )
}

export default App
