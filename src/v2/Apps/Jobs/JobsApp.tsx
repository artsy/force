import { Column, GridColumns, Separator, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CellArticleFragmentContainer } from "v2/Components/Cells/CellArticle"
import { MetaTags } from "v2/Components/MetaTags"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { JobsApp_viewer } from "v2/__generated__/JobsApp_viewer.graphql"

interface JobsAppProps {
  viewer: JobsApp_viewer
}

const JobsApp: FC<JobsAppProps> = ({ viewer }) => {
  const articles = extractNodes(viewer.articlesConnection)

  return (
    <>
      <MetaTags
        title="Jobs | Artsy"
        description="Artsy is redefining the way the world discovers art. Our mission is to make all the world’s art accessible to anyone with an Internet connection. Reaching that goal starts with our people, and so we dedicate serious time and energy to find excellent new team members as passionate about our product as we are. Want to help us? We’d love to hear from you."
        pathname="jobs"
      />

      <Spacer mt={4} />

      <GridColumns gridRowGap={4}>
        <Column span={6}>
          <Text variant="xl">Join Our Team</Text>
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

          <Separator my={2} />

          <Text variant="sm">
            Check us out on:{" "}
            <a
              href="http://www.glassdoor.com/Overview/Working-at-Artsy-EI_IE793485.11,16.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Glassdoor
            </a>
            {" | "}
            <a
              href="https://angel.co/artsy"
              target="_blank"
              rel="noopener noreferrer"
            >
              AngelList
            </a>
            {" | "}
            <a
              href="https://www.linkedin.com/company/artsyinc?trk=top_nav_home"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Text>
        </Column>

        {articles.map(article => (
          <Column span={3} key={article.internalID}>
            <CellArticleFragmentContainer
              article={article}
              mode="GRID"
              displayByline={false}
            />
          </Column>
        ))}
      </GridColumns>
    </>
  )
}

export const JobsAppFragmentContainer = createFragmentContainer(JobsApp, {
  viewer: graphql`
    fragment JobsApp_viewer on Viewer {
      articlesConnection(channelId: "578eb73cb5989e6f98f779a1", first: 50) {
        edges {
          node {
            internalID
            ...CellArticle_article
          }
        }
      }
    }
  `,
})
