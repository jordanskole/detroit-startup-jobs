import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const JOBS_PER_PAGE = 4

const Home = ({ data: { loading, error, jobs, jobsConnection, networkStatus }, loadMoreJobs }) => {
  if (error) return <h1>Error fetching jobs!</h1>
  if (jobs && jobsConnection) {
    const areMoreJobs = jobs.length < jobsConnection.aggregate.count
    return (
      <section>
        <ul className='Home-ul'>
          {jobs.map(job => (
            <li className='Home-li' key={`job-${job.id}`}>              
              <Link to={`/job/${job.id}`} className='Home-link'>
                <h3>{`${job.organization.name}: ${job.title}`}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <div className='Home-showMoreWrapper'>
          {areMoreJobs
            ? <button className='Home-button' disabled={loading} onClick={() => loadMoreJobs()}>
              {loading ? 'Loading...' : 'Show More Jobs'}
            </button>
            : ''}
        </div>
      </section>
    )
  }
  return <h2>Loading jobs...</h2>
}

export const jobs = gql`
  query jobs($first: Int!, $skip: Int!) {
    jobs(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
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