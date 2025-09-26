import { type BoxProps, Join, Spacer } from "@artsy/palette"
import { FairBoothsQueryRenderer as FairBooths } from "Apps/Fair/Components/FairBooths"
import { FairCollectionsFragmentContainer } from "Apps/Fair/Components/FairCollections/FairCollections"
import { FairEditorialRailArticlesFragmentContainer } from "Apps/Fair/Components/FairEditorial/FairEditorialRailArticles"
import { FairAboutFragmentContainer as FairAbout } from "Apps/Fair/Components/FairOverview/FairAbout"
import { FairFollowedArtistsQueryRenderer } from "Apps/Fair/Components/FairOverview/FairFollowedArtists"
import { FairStructuredData } from "Apps/Fair/Components/FairStructuredData"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Jump, useJump } from "Utils/Hooks/useJump"
import type { FairOverview_fair$data } from "__generated__/FairOverview_fair.graphql"
import { type FC, useEffect, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairOverviewProps extends BoxProps {
  fair: FairOverview_fair$data
}

const FairOverview: FC<React.PropsWithChildren<FairOverviewProps>> = ({
  fair,
}) => {
  const { user } = useSystemContext()
  const { match } = useRouter()
  const { jumpTo } = useJump()

  const { focused_booths: focusedBooths } = match.location.query

  const scrolledTo = useRef(false)

  useEffect(() => {
    if (!focusedBooths || scrolledTo.current) return

    requestAnimationFrame(() => {
      jumpTo("BoothsSection")
    })

    scrolledTo.current = true
  }, [focusedBooths, jumpTo])

  const hasArticles = (fair.articlesConnection?.edges?.length ?? 0) > 0
  const hasCollections = (fair.marketingCollections?.length ?? 0) > 0

  return (
    <>
      <FairStructuredData fair={fair} />

      <Join separator={<Spacer y={6} />}>
        <FairAbout fair={fair} />

        {hasArticles && (
          <FairEditorialRailArticlesFragmentContainer fair={fair} />
        )}

        {hasCollections && <FairCollectionsFragmentContainer fair={fair} />}

        {!!user && (
          <ArtworkGridContextProvider>
            <FairFollowedArtistsQueryRenderer id={fair.slug} />
          </ArtworkGridContextProvider>
        )}

        <Jump id="BoothsSection">
          <FairBooths slug={fair.slug} />
        </Jump>
      </Join>
    </>
  )
}

export const FairOverviewFragmentContainer = createFragmentContainer(
  FairOverview,
  {
    fair: graphql`
      fragment FairOverview_fair on Fair {
        ...FairStructuredData_fair
        ...FairEditorialRailArticles_fair
        ...FairCollections_fair
        ...FairAbout_fair
        href
        slug
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
          edges {
            __typename
          }
        }
        marketingCollections(size: 5) {
          id
        }
      }
    `,
  },
)
