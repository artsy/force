import { ShowArtworkFilterQueryRenderer } from "Apps/Show/Components/ShowArtworks"
import { ShowMetaFragmentContainer as ShowMeta } from "Apps/Show/Components/ShowMeta"
import { ShowStructuredData } from "Apps/Show/Components/ShowStructuredData"
import { RouterLink } from "System/Components/RouterLink"
import { Analytics } from "System/Contexts/AnalyticsContext"
import {
  Column,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ShowApp_show$data } from "__generated__/ShowApp_show.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { BackToFairBannerFragmentContainer as BackToFairBanner } from "./Components/BackToFairBanner"
import { ShowAboutFragmentContainer as ShowAbout } from "./Components/ShowAbout"
import { ShowArtworksEmptyStateFragmentContainer as ShowArtworksEmptyState } from "./Components/ShowArtworksEmptyState"
import { ShowContextCardFragmentContainer as ShowContextCard } from "./Components/ShowContextCard"
import { ShowHeaderFragmentContainer as ShowHeader } from "./Components/ShowHeader"
import { ShowInstallShotsFragmentContainer as ShowInstallShots } from "./Components/ShowInstallShots"
import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "./Components/ShowViewingRoom"

interface ShowAppProps {
  show: ShowApp_show$data
}

export const ShowApp: React.FC<React.PropsWithChildren<ShowAppProps>> = ({
  show,
}) => {
  const hasViewingRoom = (show.viewingRoomsConnection?.edges?.length ?? 0) > 0
  const hasAbout = !!show.about
  const hasWideHeader =
    (hasAbout && hasViewingRoom) || (!hasAbout && !hasViewingRoom)
  const { isFairBooth } = show

  return (
    <>
      <ShowMeta show={show} />
      <ShowStructuredData show={show} />

      <>
        <Analytics contextPageOwnerId={show.internalID}>
          {show.fair?.hasFullFeature && isFairBooth && (
            <BackToFairBanner show={show} />
          )}

          <Spacer y={4} />

          <Join separator={<Spacer y={4} />}>
            {Number(show?.images?.length) > 0 && (
              <ShowInstallShots show={show} />
            )}

            <GridColumns>
              <Column
                span={hasWideHeader ? [12, 8, 6] : 6}
                wrap={hasWideHeader}
              >
                <ShowHeader show={show} />

                {!hasAbout && show.href && (
                  <>
                    <Spacer y={1} />

                    <RouterLink to={`${show.href}/info`}>
                      <Text variant="sm">More info</Text>
                    </RouterLink>
                  </>
                )}
              </Column>

              {hasAbout && (
                <Column span={6}>
                  <ShowAbout show={show} />

                  {show.href && (
                    <RouterLink to={`${show.href}/info`}>
                      <Text variant="sm">More info</Text>
                    </RouterLink>
                  )}
                </Column>
              )}

              {hasViewingRoom && (
                <Column span={5} start={8}>
                  <ShowViewingRoom show={show} />
                </Column>
              )}
            </GridColumns>

            {(show.counts?.eligibleArtworks ?? 0) > 0 ? (
              <ShowArtworkFilterQueryRenderer />
            ) : (
              <>
                <Separator as="hr" />

                <ShowArtworksEmptyState show={show} />
              </>
            )}

            {!show.fair?.hasFullFeature && (
              <>
                <Separator as="hr" />

                <ShowContextCard show={show} />
              </>
            )}
          </Join>
        </Analytics>
      </>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const ShowAppFragmentContainer = createFragmentContainer(ShowApp, {
  show: graphql`
    fragment ShowApp_show on Show {
      ...BackToFairBanner_show
      ...ShowAbout_show
      ...ShowArtworksEmptyState_show
      ...ShowContextCard_show
      ...ShowHeader_show
      ...ShowInstallShots_show
      ...ShowMeta_show
      ...ShowStructuredData_show
      ...ShowViewingRoom_show
      name
      href
      internalID
      slug
      about: description
      isFairBooth
      viewingRoomsConnection {
        edges {
          __typename
        }
      }
      counts {
        eligibleArtworks
      }
      fair {
        hasFullFeature
      }
      images(default: false, size: 100) {
        url
      }
    }
  `,
})
