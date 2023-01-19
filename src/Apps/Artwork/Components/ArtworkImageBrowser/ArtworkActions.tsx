import { ArtworkActions_artwork$data } from "__generated__/ArtworkActions_artwork.graphql"
import { useSystemContext } from "System"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
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
import { ArtworkDownloadButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkDownloadButton"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork$data
  selectRoomViewableFigure(): void
}

export const ArtworkActions: React.FC<ArtworkActionsProps> = ({
  artwork,
  selectRoomViewableFigure,
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

  const ViewInRoomButton = (
    <UtilButton
      name="viewInRoom"
      label="View in room"
      onClick={() => {
        selectRoomViewableFigure()
        showViewInRoom()
      }}
    />
  )

  const ShareButton = (
    <Popover
      placement="top"
      popover={<ArtworkSharePanelFragmentContainer artwork={artwork} />}
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

  const DownloadButton = (
    <ArtworkDownloadButtonFragmentContainer artwork={artwork} />
  )

  const EditButton = (
    <UtilButton
      name="edit"
      href={`${getENV("CMS_URL")}/artworks/${
        artwork.slug
      }/edit?current_partner_id=${artwork.partner?.slug}`}
      label="Edit"
      Component={UtilButtonLink}
    />
  )

  const GenomeButton = (
    <UtilButton
      name="genome"
      href={`${getENV("GENOME_URL")}/genome/artworks?artwork_ids=${
        artwork.slug
      }`}
      label="Genome"
      Component={UtilButtonLink}
    />
  )

  const SaveButton = (
    <ArtworkActionsSaveButtonFragmentContainer artwork={artwork} />
  )

  const actions = [
    {
      name: "save",
      condition: true,
      content: SaveButton,
    },
    {
      name: "viewInRoom",
      condition: artwork.isHangable,
      content: ViewInRoomButton,
    },
    {
      name: "share",
      condition: true,
      content: ShareButton,
    },
    {
      name: "download",
      condition: !!artwork.isDownloadable || isTeam,
      content: DownloadButton,
    },
    {
      name: "edit",
      condition: isAdmin && !!artwork.partner,
      content: EditButton,
    },
    {
      name: "genome",
      condition: isAdmin,
      content: GenomeButton,
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
        <Join separator={<Spacer x={0} />}>
          <Media greaterThan="xs">
            <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
              {displayableActions.map(action => {
                return (
                  <React.Fragment key={action.name}>
                    {action.content}
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
                    {action.content}
                  </React.Fragment>
                )
              })}

              {moreActions && moreActions.length > 0 && (
                <Popover
                  placement="top"
                  popover={
                    <Box width={300}>
                      {moreActions.map(action => {
                        return <Flex key={action.name}>{action.content}</Flex>
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
        ...ArtworkDownloadButton_artwork
        ...ArtworkSharePanel_artwork
        ...ViewInRoom_artwork
        slug
        downloadableImageUrl
        isDownloadable
        isHangable
        partner {
          slug
        }
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
