import { ArtworkActions_artwork$data } from "__generated__/ArtworkActions_artwork.graphql"
import { useSystemContext } from "System"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { compact } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Media } from "Utils/Responsive"
import { ArtworkSharePanelFragmentContainer } from "./ArtworkSharePanel"
import { Box, Flex, Join, Spacer, Popover } from "@artsy/palette"
import { userIsAdmin, userIsTeam } from "Utils/user"
import { ArtworkActionsSaveButtonFragmentContainer } from "./ArtworkActionsSaveButton"
import {
  useViewInRoom,
  ViewInRoomFragmentContainer,
} from "Components/ViewInRoom/ViewInRoom"
import { getENV } from "Utils/getENV"
import { UtilButton, UtilButtonLink } from "./UtilButton"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork$data
  selectDefaultSlide(): void
}

export const ArtworkActions: React.FC<ArtworkActionsProps> = ({
  artwork,
  selectDefaultSlide,
}) => {
  const { user } = useSystemContext()
  const isAdmin = userIsAdmin(user)
  const isTeam = userIsTeam(user)

  const tracking = useTracking()

  const toggleSharePanel = () => {
    tracking.trackEvent({
      flow: DeprecatedAnalyticsSchema.Flow.ArtworkShare,
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: DeprecatedAnalyticsSchema.ContextModule.ShareButton,
      type: DeprecatedAnalyticsSchema.Type.Button,
    })
  }

  const {
    showViewInRoom,
    hideViewInRoom,
    isViewInRoomVisible,
  } = useViewInRoom()

  const { is_downloadable, artists, title, date } = artwork

  const ViewInRoomButton = () => {
    return (
      <UtilButton
        name="viewInRoom"
        label="View in room"
        onClick={() => {
          selectDefaultSlide()
          showViewInRoom()
        }}
      />
    )
  }

  const ShareButton = () => {
    return (
      <Popover
        placement="top"
        title="Share"
        popover={
          <ArtworkSharePanelFragmentContainer
            width={300}
            pt={1}
            artwork={artwork}
          />
        }
      >
        {({ anchorRef, onVisible }) => {
          return (
            <UtilButton
              ref={anchorRef}
              name="share"
              onClick={() => {
                onVisible()
                toggleSharePanel() // Tracking
              }}
              label="Share"
            />
          )
        }}
      </Popover>
    )
  }

  const DownloadButton = () => {
    const artistNames = (artists ?? []).map(artist => artist?.name).join(", ")
    const filename = compact([artistNames, title, date]).join(", ").trim()

    return (
      <UtilButton
        name="download"
        href={artwork.downloadableImageUrl!}
        label="Download"
        download={filename}
        Component={UtilButtonLink}
      />
    )
  }

  const EditButton = () => {
    return (
      <UtilButton
        name="edit"
        href={`${getENV("CMS_URL")}/artworks/${
          artwork.slug
        }/edit?current_partner_id=${artwork.partner?.slug}`}
        label="Edit"
        Component={UtilButtonLink}
      />
    )
  }

  const GenomeButton = () => {
    return (
      <UtilButton
        name="genome"
        href={`${getENV("GENOME_URL")}/genome/artworks?artwork_ids=${
          artwork.slug
        }`}
        label="Genome"
        Component={UtilButtonLink}
      />
    )
  }

  const SaveButton = () => {
    return <ArtworkActionsSaveButtonFragmentContainer artwork={artwork} />
  }

  const actions = [
    {
      name: "save",
      condition: true,
      Component: SaveButton,
    },
    {
      name: "viewInRoom",
      condition: artwork.is_hangable,
      Component: ViewInRoomButton,
    },
    {
      name: "share",
      condition: true,
      Component: ShareButton,
    },
    {
      name: "download",
      condition: !!is_downloadable || isTeam,
      Component: DownloadButton,
    },
    {
      name: "edit",
      condition: isAdmin && !!artwork.partner,
      Component: EditButton,
    },
    {
      name: "genome",
      condition: isAdmin,
      Component: GenomeButton,
    },
  ]

  const displayableActions = actions.filter(({ condition }) => condition)
  const initialActions = displayableActions.slice(0, 3)
  const moreActions = displayableActions.slice(3)

  return (
    <>
      {isViewInRoomVisible && (
        <ViewInRoomFragmentContainer
          artwork={artwork}
          onClose={hideViewInRoom}
        />
      )}

      <Container>
        <Join separator={<Spacer mx={0} />}>
          <Media greaterThan="xs">
            <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
              {displayableActions.map(action => {
                return (
                  <React.Fragment key={action.name}>
                    <action.Component />
                  </React.Fragment>
                )
              })}
            </Flex>
          </Media>

          <Media at="xs">
            <Flex>
              {initialActions.map(action => {
                return (
                  <React.Fragment key={action.name}>
                    <action.Component />
                  </React.Fragment>
                )
              })}

              {moreActions && moreActions.length > 0 && (
                <Popover
                  placement="top"
                  popover={
                    <Box width={300}>
                      {moreActions.map(action => {
                        return (
                          <Flex key={action.name}>
                            <action.Component />
                          </Flex>
                        )
                      })}
                    </Box>
                  }
                >
                  {({ anchorRef, onVisible }) => {
                    return (
                      <UtilButton
                        ref={anchorRef as any}
                        name="more"
                        onClick={onVisible}
                      />
                    )
                  }}
                </Popover>
              )}
            </Flex>
          </Media>
        </Join>
      </Container>
    </>
  )
}

export const ArtworkActionsFragmentContainer = createFragmentContainer(
  ArtworkActions,
  {
    artwork: graphql`
      fragment ArtworkActions_artwork on Artwork {
        ...ArtworkActionsSaveButton_artwork
        ...ArtworkSharePanel_artwork
        ...ViewInRoom_artwork
        artists {
          name
        }
        date
        dimensions {
          cm
        }
        slug
        image {
          internalID
          url(version: "larger")
          height
          width
        }
        downloadableImageUrl
        is_downloadable: isDownloadable
        is_hangable: isHangable
        partner {
          slug
        }
        title
        sale {
          is_closed: isClosed
          is_auction: isAuction
        }
        is_saved: isSaved
      }
    `,
  }
)

const Container = styled(Flex)`
  user-select: none;
  justify-content: center;
  align-items: center;
`

ArtworkActionsFragmentContainer.displayName = "ArtworkActions"
