import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'

const Job = ({ data: { loading, error, job } }) => {
  if (error) return (<h1>Error fetching the job!</h1>)
  if (!loading) {
    return (
      <article>
        <Helmet>
          <title>{`${job.title} @ ${job.organization.name} | Detroit Startup Jobs`}</title>
            <meta name="description" content={job.seoDescription} />
        </Helmet>
        <h1>{job.title} @ {job.organization.name}</h1>
        <p>
          <strong>Skills: </strong>
          {job.skills.map(skill => (
            <Link key={skill.id} to={`${process.env.PUBLIC_URL}/skill/${skill.slug}`}>{skill.name},</Link>
          ))}
        </p>
        <Markdown
          source={job.description}
          escapeHtml={false}
        />
      <a href={`${job.url}?source=detroitstartupjobs.com&medium=referral&campaign=${job.title}`} target='_blank'>Apply Now 👉</a>
      </article>
    )
  }
  return (<h2>Loading job...</h2>)
}

export const singleJob = gql`
  query singleJob($id: ID!) {
    job(where: {id: $id}) {
      id
      title
      seoDescription
      description
      createdAt
      url
      organization {
        id
        name
      }
      skills {
        id
        name
        slug
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