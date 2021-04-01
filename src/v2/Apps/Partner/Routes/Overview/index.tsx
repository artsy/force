import React from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesRailFragmentContainer as ArticlesRail } from "../../Components/Overview/ArticlesRail"
import { Overview_partner } from "v2/__generated__/Overview_partner.graphql"

interface OverviewProps {
  partner: Overview_partner
}

const Overview: React.FC<OverviewProps> = ({ partner }) => {
  const {
    articlesConnection: { edges: articles },
  } = partner

  return (
    <Box>
      <ArticlesRail partnerSlug={partner.slug} articles={articles} />
    </Box>
  )
}

export const OverviewFragmentContainer = createFragmentContainer(Overview, {
  partner: graphql`
    fragment Overview_partner on Partner {
      slug
      articlesConnection(first: 10)
        @connection(key: "ArticlesQuery_articlesConnection") {
        totalCount
        edges {
          ...ArticlesRail_articles
        }
      }
    }
  `,
})
