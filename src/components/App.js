import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

import '../assets/App.css';

import Home from './home/Home';
import Project from './project/Project';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/project/:project' component={Project} />
          <Route path='/' exact component={Home} />
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
