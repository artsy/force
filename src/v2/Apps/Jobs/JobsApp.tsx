import { Column, GridColumns, Separator, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { MetaTags } from "v2/Components/MetaTags"
import { RouterLink } from "v2/System/Router/RouterLink"
import { JobsApp_viewer } from "v2/__generated__/JobsApp_viewer.graphql"
import { JobsFilterFragmentContainer } from "./Components/JobsFilter"

const HEADER_IMAGE_URL =
  "https://artsy-media-uploads.s3.amazonaws.com/xUM8bX2vV6CkHmlNuKUF-g%2F18_11_09_Artsy_0573%2B0591.jpg"

interface JobsAppProps {
  viewer: JobsApp_viewer
}

const JobsApp: FC<JobsAppProps> = ({ viewer }) => {
  return (
    <>
      <MetaTags
        title="Jobs | Artsy"
        description="Artsy is redefining the way the world discovers art. Our mission is to make all the world’s art accessible to anyone with an Internet connection. Reaching that goal starts with our people, and so we dedicate serious time and energy to find excellent new team members as passionate about our product as we are. Want to help us? We’d love to hear from you."
        pathname="jobs"
        imageURL={HEADER_IMAGE_URL}
      />

      <FullBleedHeader src={HEADER_IMAGE_URL} />

      <Spacer mt={4} />

      <GridColumns gridRowGap={4}>
        <Column span={6}>
          <Text variant="xl" as="h1">
            Join Our Team
          </Text>
        </Column>

        <Column span={6}>
          <Text variant="sm">
            Artsy is redefining the way the world discovers art. Our mission is
            to expand the art market to support more artists and art in the
            world. Reaching that goal starts with our people. We dedicate an
            extraordinary amount of time and energy to finding world-class
            talent to join the Artsy Team. Want to join us? We’d love to hear
            from you.
          </Text>

          <Spacer mt={2} />

          <Text variant="sm">
            <RouterLink to="/article/artsy-jobs-life-artsy">
              Life at Artsy
            </RouterLink>

            <br />

            <RouterLink to="/article/artsy-jobs-engineering">
              Artsy Engineering
            </RouterLink>
          </Text>

          <Spacer mt={2} />

          <Text variant="sm">
            Check us out on{" "}
            <a
              href="http://www.glassdoor.com/Overview/Working-at-Artsy-EI_IE793485.11,16.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Glassdoor
            </a>
            ,{" "}
            <a
              href="https://angel.co/artsy"
              target="_blank"
              rel="noopener noreferrer"
            >
              AngelList
            </a>
            , and{" "}
            <a
              href="https://www.linkedin.com/company/artsyinc?trk=top_nav_home"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Text>
        </Column>
      </GridColumns>

      <Separator my={4} />

      <JobsFilterFragmentContainer viewer={viewer} />
    </>
  )
}

export const JobsAppFragmentContainer = createFragmentContainer(JobsApp, {
  viewer: graphql`
    fragment JobsApp_viewer on Viewer {
      ...JobsFilter_viewer
    }
  `,
})
