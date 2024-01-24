//import { useState } from 'react'
import Game from "./Components/Game.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Intro from "./Components/Intro.jsx";
import Mercado from "./Components/MercadoPago.jsx";
import VideoCall from './Components/VideoCall.jsx'
import Chats from './Components/Chats.jsx'
import BorradorLogin from './Components/BorradorLogin.jsx'
import {CookieProvider} from './context/CookieContex.jsx'

function App() {
  return (
    <>
      <div className="App">
        <CookieProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/game" element={<Game />} />
            <Route path="/mercado" element={<Mercado />} />
            <Route path="/llamada" element={<VideoCall />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/login" element={<BorradorLogin/>} />
         
          </Routes>
        </Router>
        </CookieProvider>
      </div>
    </>
  );
}

export default App;
