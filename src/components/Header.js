import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.header`

`

const SiteName = styled.h1`

`

const HeaderMenu = styled.nav`

`

const HeaderMenuItem = styled(NavLink)`
  font-size: 1.1em;
  margin-right: 1em;
`

const HeaderMenuLink = styled.a`
  font-size: 1.1em;
  margin-right: 1em;
`

class Header extends React.Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <HeaderWrapper>
        <SiteName>👩‍💻 Detroit Startup Jobs</SiteName>
        <HeaderMenu>
          <HeaderMenuItem
            exact to={process.env.PUBLIC_URL + '/'}
          >
            🏠home
          </HeaderMenuItem>
          <HeaderMenuItem
            exact to={process.env.PUBLIC_URL + '/jobs'}
          >
            👔jobs
          </HeaderMenuItem>
          <HeaderMenuItem
            exact to={process.env.PUBLIC_URL + '/companies'}
          >
            🏢companies
          </HeaderMenuItem>
          <HeaderMenuItem
            exact to={process.env.PUBLIC_URL + '/skills'}
          >
            ⛹️‍skills
          </HeaderMenuItem>
          <HeaderMenuLink
            href="https://airtable.com/shrKhNwJQYIBjUEya"
            target="_blank"
          >
            📋submit
          </HeaderMenuLink>
          {
            !isAuthenticated() && (

                <HeaderMenuItem
                  to="#"
                  onClick={this.login.bind(this)}
                >
                  🔐login
                </HeaderMenuItem>
              )
            }
            {
              isAuthenticated() && (
                <HeaderMenuItem
                  to="#"
                  onClick={this.logout.bind(this)}
                >
                  🔓logout
                </HeaderMenuItem>
              )
            }

        </HeaderMenu>
      </HeaderWrapper>
    )
  }
}

export default Header;