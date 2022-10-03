import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Text } from "@artsy/palette"
import { JobLink_job$data } from "__generated__/JobLink_job.graphql"

interface JobLinkProps {
  job: JobLink_job$data
}

const JobLink: FC<JobLinkProps> = ({ job }) => {
  return (
    <RouterLink
      to={`/job/${job.id}`}
      display="block"
      textDecoration="none"
      key={job.id}
    >
      <Text variant="sm-display">{job.title}</Text>

      <Text variant="sm-display" color="black60">
        {job.location}
      </Text>
    </RouterLink>
  )
}

export const JobLinkFragmentContainer = createFragmentContainer(JobLink, {
  job: graphql`
    fragment JobLink_job on Job {
      id
      title
      location
    }
  `,
})
