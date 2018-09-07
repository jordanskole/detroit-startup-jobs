import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import Header from './components/Header'
import Footer from './components/Footer'
import JobList from './components/JobList'
import Job from './components/Job'
import CompanyList from './components/CompanyList'
import Company from './components/Company'
import ComingSoon from './components/ComingSoon'
import SkillList from './components/SkillList'
import Skill from './components/Skill'

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0% 5%;
`

const App = () => (
  <Router>
    <Wrapper>
      <Helmet>
        <title>Detroit Startup Jobs</title>
      </Helmet>
      <Header />
      <main>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={JobList} />
        <Route path={process.env.PUBLIC_URL + '/jobs'} component={JobList} />
        <Route path={process.env.PUBLIC_URL + '/job/:id'} component={Job} />
        <Route path={process.env.PUBLIC_URL + '/companies'} component={CompanyList} />
        <Route path={process.env.PUBLIC_URL + '/company/:slug'} component={Company} />
        <Route path={process.env.PUBLIC_URL + '/skills'} component={SkillList} />
        <Route path={process.env.PUBLIC_URL + '/skill/:slug'} component={Skill} />
        <Route path={process.env.PUBLIC_URL + '/submit'} component={ComingSoon} />
        <Route path={process.env.PUBLIC_URL + '/account'} component={ComingSoon} />
      </main>
      <Footer />
    </Wrapper>
  </Router>
)

export default App;