import React from 'react';
import {
  Route,
  Navigate,
  Routes,
  BrowserRouter as Router
} from 'react-router-dom';

import '../assets/App.css';

import Home from './home/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
