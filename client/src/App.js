import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home.js'
import Titanic from './pages/Titanic.js';

function App() {

  return (

    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/titanic" element={<Titanic />} />

        </Routes>
      </div>
    </Router>

  )
}

export default App
