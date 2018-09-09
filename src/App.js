import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import Header from './components/Header'
import Footer from './components/Footer'
import JobList from './components/JobList'
import Job from './components/Job'
import Callback from './components/Callback'
import CompanyList from './components/CompanyList'
import Company from './components/Company'
import ComingSoon from './components/ComingSoon'
import SkillList from './components/SkillList'
import Skill from './components/Skill'

import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0% 5%;
`


const App = () => (
  <Wrapper>
    <Helmet>
      <title>Detroit Startup Jobs</title>
    </Helmet>
    <Header auth={auth} />
    <main>
      <Route exact path='/' render={(props) => <JobList {...props} />} />
      <Route path='/jobs' render={(props) => <JobList {...props} />} />
      <Route path='/job/:id' render={(props) => <Job {...props} />} />
      <Route path='/companies' render={(props) => <CompanyList {...props} />} />
      <Route path='/company/:slug' render={(props) => <Company {...props} />} />
      <Route path='/skills' render={(props) => <SkillList {...props} />} />
      <Route path='/skill/:slug' render={(props) => <Skill {...props} />} />
      <Route path='/submit' render={(props) => <ComingSoon {...props} />} />
      <Route path='/account' render={(props) => <ComingSoon {...props} />} />
      <Route path='/callback' render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }}/>
    </main>
    <Footer />
  </Wrapper>
)

export default App;