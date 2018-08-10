import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const JOBS_PER_PAGE = 10

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

const Home = ({ data: { loading, error, jobs, jobsConnection, networkStatus }, loadMoreJobs }) => {
  if (error) return (
    <h1>Error fetching jobs! <Link to={process.env.PUBLIC_URL + '/'}>Reload</Link></h1>
  )
  if (jobs && jobsConnection) {
    const areMoreJobs = jobs.length < jobsConnection.aggregate.count
    return (
      <Nav>
        <NavList>
          {jobs.map(job => (
            <li key={`job-${job.id}`}>
              <Link to={`${process.env.PUBLIC_URL}/job/${job.id}`}>
                <h3>{`${job.organization.name}: ${job.title}`}</h3>
              </Link>
              {job.seoDescription}
              <br />
              <LearnMoreLink to={`${process.env.PUBLIC_URL}/job/${job.id}`}>
                learn more &raquo;
              </LearnMoreLink>
            </li>
          ))}
        </NavList>
        <div>
          {areMoreJobs
            ? <button disabled={loading} onClick={() => loadMoreJobs()}>
              {loading ? 'Loading...' : 'Show More Jobs'}
            </button>
            : ''}
        </div>
      </Nav>
    )
  }
  return (<h2>Loading jobs...</h2>)
}

export const jobs = gql`
  query jobs($first: Int!, $skip: Int!) {
    jobs(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      seoDescription
      createdAt
      organization {
        name
      }
    },
    jobsConnection {
      aggregate {
        count
      }
    }
  }
`

export const jobsQueryVars = {
  skip: 0,
  first: JOBS_PER_PAGE
}

export default graphql(jobs, {
  options: {
    variables: jobsQueryVars
  },
  props: ({ data }) => ({
    data,
    loadMoreJobs: () => {
      return data.fetchMore({
        variables: {
          skip: data.jobs.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            allJobs: [...previousResult.jobs, ...fetchMoreResult.jobs]
          })
        }
      })
    }
  })
})(Home)