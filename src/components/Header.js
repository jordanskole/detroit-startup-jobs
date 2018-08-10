import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`

`

const SiteName = styled.h1`

`

const HeaderMenu = styled.nav`

`

const HeaderMenuItem = styled(NavLink)`
  margin-left:5px;
  margin-right:5px;
`



export default () => (
  <Header>
    <SiteName>👩‍💻 Detroit Startup Jobs</SiteName>
    <HeaderMenu>
      <HeaderMenuItem
        exact to={process.env.PUBLIC_URL + '/'}
      >
        🏠home
      </HeaderMenuItem>
      <HeaderMenuItem
        exact to={process.env.PUBLIC_URL + '/companies'}
      >
        🏢companies
      </HeaderMenuItem>
      <HeaderMenuItem
        exact to={process.env.PUBLIC_URL + '/jobs'}
      >
        👔jobs
      </HeaderMenuItem>

      <HeaderMenuItem
        exact to={process.env.PUBLIC_URL + '/submit'}
      >
        📋submit
      </HeaderMenuItem>
      <HeaderMenuItem
        exact to={process.env.PUBLIC_URL + '/account'}
      >
        🤓account
      </HeaderMenuItem>
    </HeaderMenu>
  </Header>
)