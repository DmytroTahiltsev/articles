import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import { UseRoutes } from './routes';

function App() {
  const routes = UseRoutes(false)
  return (
    <Router>
      <div className="container">
        {routes}
      </div>
    </Router>
  );
}

export default App;
