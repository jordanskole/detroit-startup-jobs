import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import Header from './components/Header'
import Home from './components/Home'
import Job from './components/Job'
import ComingSoon from './components/ComingSoon'

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0% 5%;
`

const App = () => (
  <Router>
    <Wrapper>
      <Header />
      <main>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
        <Route path={process.env.PUBLIC_URL + '/jobs'} component={ComingSoon} />
        <Route path={process.env.PUBLIC_URL + '/job/:id'} component={Job} />
        <Route path={process.env.PUBLIC_URL + '/companies'} component={ComingSoon} />
        <Route path={process.env.PUBLIC_URL + '/submit'} component={ComingSoon} />
        <Route path={process.env.PUBLIC_URL + '/account'} component={ComingSoon} />
      </main>
    </Wrapper>
  </Router>
)

export default App