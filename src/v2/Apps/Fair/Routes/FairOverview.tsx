import * as React from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import {
  FairEditorialFragmentContainer,
  FAIR_EDITORIAL_AMOUNT,
} from "../Components/FairEditorial"
import { FairCollectionsFragmentContainer } from "../Components/FairCollections"
import { FairFollowedArtistsFragmentContainer } from "../Components/FairOverview/FairFollowedArtists"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FairOverview_fair$data } from "v2/__generated__/FairOverview_fair.graphql"
import { FairAboutFragmentContainer as FairAbout } from "../Components/FairOverview/FairAbout"
import { data as sd } from "sharify"
import { FairBoothsQueryRenderer as FairBooths } from "../Components/FairBooths"

interface FairOverviewProps extends BoxProps {
  fair: FairOverview_fair$data
}

const FairOverview: React.FC<FairOverviewProps> = ({ fair }) => {
  const { user } = useSystemContext()
  const hasArticles = (fair.articlesConnection?.edges?.length ?? 0) > 0
  const hasCollections = (fair.marketingCollections?.length ?? 0) > 0

  return (
    <Box>
      <FairAbout fair={fair} />

      {hasArticles && (
        <Box my={6}>
          <Box display="flex" justifyContent="space-between">
            {(fair.articlesConnection?.totalCount ?? 0) >
              FAIR_EDITORIAL_AMOUNT && (
              <RouterLink to={`${fair.href}/articles`} noUnderline>
                <Text variant="sm">View all</Text>
              </RouterLink>
            )}
          </Box>

          <FairEditorialFragmentContainer fair={fair} />
        </Box>
      )}

      {hasCollections && (
        <Box my={6}>
          <Text variant="lg" as="h3" mb={4}>
            Curated Highlights
          </Text>

          <FairCollectionsFragmentContainer fair={fair} />
        </Box>
      )}

      {!!user && <FairFollowedArtistsFragmentContainer fair={fair} my={6} />}

      {sd.ENABLE_FAIR_PAGE_EXHIBITORS_TAB && (
        <>
          <Text variant="lg" mb={4}>
            Booths
          </Text>
          <FairBooths slug={fair.slug} />
        </>
      )}
    </Box>
  )
}

export const FairOverviewFragmentContainer = createFragmentContainer(
  FairOverview,
  {
    fair: graphql`
      fragment FairOverview_fair on Fair {
        ...FairEditorial_fair
        ...FairCollections_fair
        ...FairFollowedArtists_fair
        ...FairAbout_fair
        href
        slug
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
          totalCount
          edges {
            __typename
          }
        }
        marketingCollections(size: 5) {
          id
        }
      }
    `,
  }
)
