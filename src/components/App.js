import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

import '../assets/App.css';

import Home from './home/Home';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
