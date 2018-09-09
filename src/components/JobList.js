import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

const JOBS_PER_PAGE = 50

const Nav = styled.section`
  width: 100%;
`

const NavList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`

const NavItem = styled.li`
  padding-top: 1.5em;
`
const NavItemTitle = styled.h3`

`

const NavItemDescription = styled.p`

`

const LearnMoreLink = styled(Link)`
  font-style: italic;
  padding-top: 0.5em;
`

const JobList = ({ data: { loading, error, jobs, jobsConnection, networkStatus }, loadMoreJobs }) => {
  if (error) return (
    <h1>Error fetching jobs! <Link to='/'>Reload</Link></h1>
  )
  if (jobs && jobsConnection) {
    const areMoreJobs = jobs.length < jobsConnection.aggregate.count
    return (
      <Nav>
        <Helmet>
          <link rel="canonical" href="https://detroitstartupjobs.com/" />
        </Helmet>
        <NavList>
          {jobs.map(job => (
            <NavItem key={`job-${job.id}`}>
              <Link to={`/job/${job.id}`}>
                <NavItemTitle>{`${job.organization.name}: ${job.title}`}</NavItemTitle>
              </Link>
              <NavItemDescription>{job.seoDescription}</NavItemDescription>
              <LearnMoreLink to={`/job/${job.id}`}>
                learn more &raquo;
              </LearnMoreLink>
            </NavItem>
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
    variables: jobsQueryVars,
    notifyOnNetworkStatusChange: true
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
            jobs: [...previousResult.jobs, ...fetchMoreResult.jobs]
          })
        }
      })
    }
  })
})(JobList)