import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'

const Skill = ({ data: { loading, error, skill } }) => {
  if (error) {
    console.log(error);
    return (<h1>Error fetching the skill!</h1>)
  }
  if (!loading) {
    return (
      <article>
        <h1>{`Detroit ${skill.name} jobs`}</h1>
        <Markdown
          source={skill.description}
          escapeHtml={false}
        />
      <h3>{`There are currently ${skill.jobs.length} ${skill.name} startup jobs in Detroit`}</h3>
        <ul>
          {skill.jobs.map(job => (
            <li key={job.id}>
              <Link to={`/job/${job.id}`}>{`${job.title} @ ${job.organization.name} - ${job.organization.addressCity}`}</Link>
            </li>
          ))}
        </ul>

      </article>
    )
  }
  return (<h2>Loading skill...</h2>)
}

export const singleSkill = gql`
  query singleSkill($slug: String!) {
    skill(where: {slug: $slug}) {
      id
      name
      description
      jobs {
        id
        title
        organization {
          id
          name
        }
      }
    }
  }
`

export default graphql(singleSkill, {
  options: ({ match }) => ({
    variables: {
      slug: match.params.slug
    }
  })
})(Skill)