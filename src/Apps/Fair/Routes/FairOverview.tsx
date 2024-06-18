import { FC, useEffect, useRef } from "react"
import { BoxProps, Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCollectionsFragmentContainer } from "Apps/Fair/Components/FairCollections/FairCollections"
import { FairFollowedArtistsFragmentContainer } from "Apps/Fair/Components/FairOverview/FairFollowedArtists"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FairOverview_fair$data } from "__generated__/FairOverview_fair.graphql"
import { FairAboutFragmentContainer as FairAbout } from "Apps/Fair/Components/FairOverview/FairAbout"
import { FairBoothsQueryRenderer as FairBooths } from "Apps/Fair/Components/FairBooths"
import { useRouter } from "System/Hooks/useRouter"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { FairEditorialRailArticlesFragmentContainer } from "Apps/Fair/Components/FairEditorial/FairEditorialRailArticles"

interface FairOverviewProps extends BoxProps {
  fair: FairOverview_fair$data
}

const FairOverview: FC<FairOverviewProps> = ({ fair }) => {
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
      <Join separator={<Spacer y={6} />}>
        <FairAbout fair={fair} />

        {hasArticles && (
          <FairEditorialRailArticlesFragmentContainer fair={fair} />
        )}

        {hasCollections && <FairCollectionsFragmentContainer fair={fair} />}

        {!!user && <FairFollowedArtistsFragmentContainer fair={fair} />}

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
        ...FairEditorialRailArticles_fair
        ...FairCollections_fair
        ...FairFollowedArtists_fair
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
  }
)
