import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Job from './components/Job'

const App = () => (
  <Router>
    <div>
      <Header />
      <main>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
        <Route path={process.env.PUBLIC_URL + '/job/:id'} component={Job} />
      </main>
    </div>
  </Router>
)

export default App