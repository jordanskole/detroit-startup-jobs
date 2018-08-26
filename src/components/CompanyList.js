import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

const COMPANIES_PER_PAGE = 50

const Nav = styled.section`
  width: 100%;
`

const NavList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`

const NavItem = styled.li`
  padding-top: 2em;
`
const NavItemTitle = styled.h3`
  margin: 0.5em 0em;
`

const NavItemDescription = styled.p`
  margin: 0.5em 0em;
`

const LearnMoreLink = styled(Link)`
  font-style: italic;
  padding-top: 0.5em;
`

const CompanyList = ({ data: { loading, error, organizations, organizationsConnection, networkStatus }, loadMoreCompanies }) => {
  if (error) return (
    <h1>Error fetching companies! <Link to={process.env.PUBLIC_URL + '/'}>Reload</Link></h1>
  )
  if (organizations && organizationsConnection) {
    const areMoreCompanies = organizations.length < organizationsConnection.aggregate.count
    return (
      <Nav>
        <h1>{`Detroit Startup List`}</h1>
        <NavList>
          {organizations.map(company => (
            <NavItem key={`company-${company.id}`}>
              <h3>
                <Link to={`${process.env.PUBLIC_URL}/company/${company.slug}`}>
                  {company.name}
                </Link>
              </h3>
              <NavItemDescription>{company.seoDescription}</NavItemDescription>
              <LearnMoreLink to={`${process.env.PUBLIC_URL}/company/${company.slug}`}>
                {company.jobs.length > 0 ? `${company.jobs.length} jobs »` : 'learn more »'}
              </LearnMoreLink>
            </NavItem>
          ))}
        </NavList>
        <div>
          {areMoreCompanies
            ? <button disabled={loading} onClick={() => loadMoreCompanies()}>
              {loading ? 'Loading...' : 'Show More Companies'}
            </button>
            : ''}
        </div>
      </Nav>
    )
  }
  return (<h2>Loading companies...</h2>)
}

export const organizations = gql`
  query organizations($first: Int!, $skip: Int!) {
    organizations(orderBy: name_ASC, first: $first, skip: $skip) {
      id
      slug
      name
      seoDescription
      jobs {
        id
      }
      cities {
        name
        slug
      }
    },
    organizationsConnection {
      aggregate {
        count
      }
    }
  }
`

export const organizationsQueryVars = {
  skip: 0,
  first: COMPANIES_PER_PAGE
}

export default graphql(organizations, {
  options: {
    variables: organizationsQueryVars
  },
  props: ({ data }) => ({
    data,
    loadMoreCompanies: () => {
      return data.fetchMore({
        variables: {
          skip: data.companies.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            companies: [...previousResult.companies, ...fetchMoreResult.companies]
          })
        }
      })
    }
  })
})(CompanyList)