import { ArtworkActions_artwork } from "v2/__generated__/ArtworkActions_artwork.graphql"
import { useSystemContext } from "v2/System"
import { AnalyticsSchema, useTracking } from "v2/System/Analytics"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled, { css } from "styled-components"
import { slugify } from "underscore.string"
import { Media } from "v2/Utils/Responsive"
import { ArtworkSharePanelFragmentContainer } from "./ArtworkSharePanel"
import {
  BellIcon,
  Box,
  Clickable,
  DownloadIcon,
  EditIcon,
  Flex,
  GenomeIcon,
  HeartIcon,
  Join,
  Link,
  MoreIcon,
  OpenEyeIcon,
  ShareIcon,
  Spacer,
  Text,
  Popover,
} from "@artsy/palette"
import { userIsAdmin, userIsTeam } from "v2/Utils/user"
import { themeGet } from "@styled-system/theme-get"
import { ArtworkActionsSaveButtonFragmentContainer } from "./ArtworkActionsSaveButton"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork
  selectDefaultSlide(): void
}

export const ArtworkActions: React.FC<ArtworkActionsProps> = ({
  artwork,
  selectDefaultSlide,
}) => {
  const { user, mediator } = useSystemContext()
  const isAdmin = userIsAdmin(user)
  const isTeam = userIsTeam(user)

  const tracking = useTracking()

  const toggleSharePanel = () => {
    tracking.trackEvent({
      flow: AnalyticsSchema.Flow.ArtworkShare,
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.ShareButton,
      type: AnalyticsSchema.Type.Button,
    })
  }

  const openViewInRoom = () => {
    selectDefaultSlide()

    const { dimensions, image } = artwork

    setTimeout(() => {
      mediator?.trigger("openViewInRoom", { dimensions, image })

      tracking.trackEvent({
        flow: AnalyticsSchema.Flow.ArtworkViewInRoom,
        action_type: AnalyticsSchema.ActionType.Click,
        context_module: AnalyticsSchema.ContextModule.ViewInRoom,
        type: AnalyticsSchema.Type.Button,
      })
    }, 300)
  }

  const { is_downloadable, href, artists, title, date } = artwork

  const ViewInRoomButton = () => {
    return (
      <UtilButton
        name="viewInRoom"
        onClick={openViewInRoom}
        label="View in room"
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
    const filename = slugify(compact([artistNames, title, date]).join(" "))

    return (
      <UtilButton
        name="download"
        href={`${href}/download/${filename}.jpg`}
        label="Download"
        Component={UtilButtonLink}
      />
    )
  }

  const EditButton = () => {
    return (
      <UtilButton
        name="edit"
        href={`${sd.CMS_URL}/artworks/${artwork.slug}/edit?current_partner_id=${artwork.partner?.slug}`}
        label="Edit"
        Component={UtilButtonLink}
      />
    )
  }

  const GenomeButton = () => {
    return (
      <UtilButton
        name="genome"
        href={`${sd.GENOME_URL}/genome/artworks?artwork_ids=${artwork.slug}`}
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
        artists {
          name
        }
        date
        dimensions {
          cm
        }
        href
        slug
        image {
          internalID
          url(version: "larger")
          height
          width
        }
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

interface UtilButtonProps {
  name:
    | "bell"
    | "edit"
    | "download"
    | "genome"
    | "heart"
    | "more"
    | "share"
    | "viewInRoom"
  href?: string
  selected?: boolean
  label?: string
  Icon?: React.ReactNode
  Component?: typeof UtilButtonButton | typeof UtilButtonLink
  onClick?: () => void
}

export const UtilButton: React.ForwardRefExoticComponent<
  UtilButtonProps & {
    ref?: React.Ref<HTMLElement>
  }
> = React.forwardRef(
  (
    { href, label, name, onClick, Icon, Component = UtilButtonButton, ...rest },
    forwardedRef
  ) => {
    const getIcon = () => {
      switch (name) {
        case "bell":
          return BellIcon
        case "download":
          return DownloadIcon
        case "edit":
          return EditIcon
        case "genome":
          return GenomeIcon
        case "heart":
          return HeartIcon
        case "more":
          return MoreIcon
        case "share":
          return ShareIcon
        case "viewInRoom":
          return OpenEyeIcon
      }
    }

    // If we're passing in an `Icon`, override
    const ActionIcon = Icon ? Icon : getIcon()

    return (
      <Component
        ref={forwardedRef as any}
        p={1}
        onClick={onClick}
        {...(href ? { href, target: "_blank" } : {})}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          width={20}
          height={20}
          mr={0.5}
        >
          {/* TODO: Fix types */}
          {/* @ts-ignore */}
          <ActionIcon {...rest} fill="currentColor" />
        </Flex>

        {label && (
          <Text variant="xs" lineHeight={1}>
            {label}
          </Text>
        )}
      </Component>
    )
  }
)

const utilButtonMixin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeGet("colors.black100")};

  &:hover {
    color: ${themeGet("colors.blue100")};
    text-decoration: underline;
  }
`

const UtilButtonLink = styled(Link)`
  ${utilButtonMixin}
  text-decoration: none;
`

const UtilButtonButton = styled(Clickable)`
  ${utilButtonMixin}
`

const Container = styled(Flex)`
  user-select: none;
  justify-content: center;
  align-items: center;
`

ArtworkActionsFragmentContainer.displayName = "ArtworkActions"
