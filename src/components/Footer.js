import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`

`

const HeaderMenu = styled.nav`
  padding-top: 5em;
`

const HeaderMenuItem = styled(NavLink)`
  font-size: 1.1em;
  margin-right: 1em;
`



export default () => (
  <Header>
    <HeaderMenu>
      <HeaderMenuItem
        exact to='/'
      >
        🏠home
      </HeaderMenuItem>
      <HeaderMenuItem
        exact to='/jobs'
      >
        👔jobs
      </HeaderMenuItem>
      <HeaderMenuItem
        exact to='/companies'
      >
        🏢companies
      </HeaderMenuItem>
      <HeaderMenuItem
        exact to='/skills'
      >
        ⛹️‍skills
      </HeaderMenuItem>
      <HeaderMenuItem
        exact to='/submit'
      >
        📋submit
      </HeaderMenuItem>
      <HeaderMenuItem
        exact to='/account'
      >
        🔐login
      </HeaderMenuItem>
    </HeaderMenu>
  </Header>
)