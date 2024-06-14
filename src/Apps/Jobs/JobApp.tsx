import {
  Column,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { TopContextBar } from "Components/TopContextBar"
import { JobApp_job$data } from "__generated__/JobApp_job.graphql"
import { PageHTML } from "Apps/Page/Components/PageHTML"
import { RouterLink } from "System/Components/RouterLink"

interface JobAppProps {
  job: JobApp_job$data
}

const JobApp: FC<JobAppProps> = ({ job }) => {
  return (
    <>
      <MetaTags
        title={`${job.title} | Artsy`}
        description="Artsy is redefining the way the world discovers art. Our mission is to make all the world’s art accessible to anyone with an Internet connection. Reaching that goal starts with our people, and so we dedicate serious time and energy to find excellent new team members as passionate about our product as we are. Want to help us? We’d love to hear from you."
        pathname={`/job/${job.id}`}
      />

      <TopContextBar displayBackArrow href="/jobs">
        Join Our Team
      </TopContextBar>

      <Spacer y={4} />

      <Text variant="xl" as="h1">
        {job.title}
      </Text>

      <Text variant="xl" color="black60">
        {job.location}
      </Text>

      <Spacer y={4} />

      <GridColumns gridRowGap={4}>
        <Column span={8} start={3}>
          <Join separator={<Spacer y={4} />}>
            <PageHTML dangerouslySetInnerHTML={{ __html: job.content }} />

            <Separator my={2} />

            <Text variant="lg-display">To Apply</Text>

            <Text variant="sm">
              To apply, please{" "}
              <RouterLink
                inline
                to={job.externalURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                submit your application here
              </RouterLink>
              . When you apply, you will be directed to a third party site.
            </Text>

            <Text variant="xs">
              ARTSY IS AN EQUAL OPPORTUNITY EMPLOYER. WE VALUE A DIVERSE
              WORKFORCE AND AN INCLUSIVE CULTURE. WE ENCOURAGE APPLICATIONS FROM
              ALL QUALIFIED INDIVIDUALS WITHOUT REGARD TO RACE, COLOR, RELIGION,
              GENDER, SEXUAL ORIENTATION, GENDER IDENTITY OR EXPRESSION, AGE,
              NATIONAL ORIGIN, MARITAL STATUS, DISABILITY, AND VETERAN STATUS.
            </Text>
          </Join>
        </Column>
      </GridColumns>
    </>
  )
}

export const JobAppFragmentContainer = createFragmentContainer(JobApp, {
  job: graphql`
    fragment JobApp_job on Job {
      id
      title
      location
      content
      externalURL
    }
  `,
})
