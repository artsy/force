import { FC, useEffect } from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import {
  FairEditorialFragmentContainer,
  FAIR_EDITORIAL_AMOUNT,
} from "Apps/Fair/Components/FairEditorial"
import { FairCollectionsFragmentContainer } from "Apps/Fair/Components/FairCollections"
import { FairFollowedArtistsFragmentContainer } from "Apps/Fair/Components/FairOverview/FairFollowedArtists"
import { useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"
import { FairOverview_fair$data } from "__generated__/FairOverview_fair.graphql"
import { FairAboutFragmentContainer as FairAbout } from "Apps/Fair/Components/FairOverview/FairAbout"
import { FairBoothsQueryRenderer as FairBooths } from "Apps/Fair/Components/FairBooths"
import { useRouter } from "System/Router/useRouter"
import { useScrollToElement } from "Utils/Hooks/useScrollTo"

interface FairOverviewProps extends BoxProps {
  fair: FairOverview_fair$data
}

const FairOverview: FC<FairOverviewProps> = ({ fair }) => {
  const { user } = useSystemContext()
  const { match } = useRouter()
  const { focused_booths: focusedBooths } = match.location.query
  const { scrollTo: scrollToBooths } = useScrollToElement({
    behavior: "smooth",
    selectorOrRef: "#jump--BoothsSection",
    offset: 160, // Sticky top header
  })

  /**
   * scrollTo without requestAnimationFrame doesn't scroll to container
   * when it is used in useEffect hook
   */
  useEffect(() => {
    if (focusedBooths) {
      requestAnimationFrame(() => {
        scrollToBooths()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedBooths])

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
          <Text variant="lg-display" as="h3" mb={4}>
            Curated Highlights
          </Text>

          <FairCollectionsFragmentContainer fair={fair} />
        </Box>
      )}

      {!!user && <FairFollowedArtistsFragmentContainer fair={fair} my={6} />}

      <Box id="jump--BoothsSection">
        <Text variant="lg-display" mb={4}>
          Booths
        </Text>
        <FairBooths slug={fair.slug} />
      </Box>
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
