import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'

const Job = ({ data: { loading, error, job } }) => {
  console.log('doing things');
  if (error) return <h1>Error fetching the job!</h1>
  if (!loading) {
    return (
      <article>
        <h1>{job.title} @ {job.organization.name}</h1>
        <Markdown
          source={job.description}
          escapeHtml={false}
        />
      <a href={`${job.url}?source=detroitstartupjobs.com&medium=referral&campaign=${job.title}`} target='_blank'>Apply Now 👉</a>
      </article>
    )
  }
  return <h2>Loading job...</h2>
}

export const singleJob = gql`
  query singleJob($id: ID!) {
    job(where: {id: $id}) {
      id
      title
      description
      createdAt
      url
      organization {
        id
        name
      }
    }
  }
`

export default graphql(singleJob, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})(Job)