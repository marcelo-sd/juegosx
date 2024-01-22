//import { useState } from 'react'
import Game from "./Components/Game.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Intro from "./Components/Intro.jsx";
import Mercado from "./Components/MercadoPago.jsx";
import VideoCall from './Components/VideoCall.jsx'
import Jjsjsj from './Components/Jjsjsj.jsx'

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="game" element={<Game />} />
            <Route path="mercado" element={<Mercado />} />
            <Route path="llamada" element={<VideoCall />} />
            <Route path="jjj" element={<Jjsjsj />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
