import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

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

`

const LearnMoreLink = styled(Link)`
  padding-top: 0.5em;
`

const CompanyList = ({ data: { loading, error, skills, skillsConnection, networkStatus }, loadMoreSkills }) => {
  if (error) return (
    <h1>Error fetching skills! <Link to={process.env.PUBLIC_URL + '/'}>Reload</Link></h1>
  )
  if (skills && skillsConnection) {
    const areMoreSkills = skills.length < skillsConnection.aggregate.count
    return (
      <Nav>
        <NavList>
          {skills.map(skill => (
            <li key={`skill-${skill.id}`}>
              <Link to={`${process.env.PUBLIC_URL}/skill/${skill.slug}`}>
                <h3>{`${skill.name} (${skill.jobs.length} jobs)`}</h3>
              </Link>
              {skill.description ? skill.description : ''}
              <br />
              <LearnMoreLink to={`${process.env.PUBLIC_URL}/skill/${skill.slug}`}>
                learn more &raquo;
              </LearnMoreLink>
            </li>
          ))}
        </NavList>
        <div>
          {areMoreSkills
            ? <button disabled={loading} onClick={() => loadMoreSkills()}>
              {loading ? 'Loading...' : 'Show More Skills'}
            </button>
            : ''}
        </div>
      </Nav>
    )
  }
  return (<h2>Loading skills...</h2>)
}

export const skills = gql`
  query skills($first: Int!, $skip: Int!) {
    skills(orderBy: name_ASC, first: $first, skip: $skip) {
      id
      slug
      name
      description
      jobs {
        id
      }
    },
    skillsConnection {
      aggregate {
        count
      }
    }
  }
`

export const skillsQueryVars = {
  skip: 0,
  first: COMPANIES_PER_PAGE
}

export default graphql(skills, {
  options: {
    variables: skillsQueryVars
  },
  props: ({ data }) => ({
    data,
    loadMoreSkills: () => {
      return data.fetchMore({
        variables: {
          skip: data.skills.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            skills: [...previousResult.skills, ...fetchMoreResult.skills]
          })
        }
      })
    }
  })
})(CompanyList)