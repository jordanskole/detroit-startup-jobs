import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'

const Company = ({ data: { loading, error, organization } }) => {
  console.log('doing things');
  if (error) return (<h1>Error fetching the company!</h1>)
  if (!loading) {
    return (
      <article>
        <h1>{organization.name}</h1>
        <a href={`${organization.url}?source=detroitstartupjobs.com&medium=referral&campaign=${organization.name}`} target='_blank'>🌐 {organization.url}</a>
        <Markdown
          source={organization.description}
          escapeHtml={false}
        />
        <h3>Open startup jobs:</h3>
        <ul>
          {organization.jobs.map(job => (
            <li>
              <Link to={`${process.env.PUBLIC_URL}/job/${job.id}`}>{job.title}</Link>
            </li>
          ))}
        </ul>

      </article>
    )
  }
  return (<h2>Loading company...</h2>)
}

export const singleOrganization = gql`
  query singleOrganization($slug: String!) {
    organization(where: {slug: $slug}) {
      id
      name
      description
      url
      jobs {
        id
        title
        seoDescription
      }
    }
  }
`

export default graphql(singleOrganization, {
  options: ({ match }) => ({
    variables: {
      slug: match.params.slug
    }
  })
})(Company)