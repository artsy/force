import { ArtworkActions_artwork } from "v2/__generated__/ArtworkActions_artwork.graphql"
import { useSystemContext } from "v2/System"
import { AnalyticsSchema, useTracking } from "v2/System/Analytics"
import { compact } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
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
  TextProps,
} from "@artsy/palette"
import { userIsAdmin, userIsTeam } from "v2/Utils/user"
import { themeGet } from "@styled-system/theme-get"
import { ArtworkActionsSaveButtonFragmentContainer } from "./ArtworkActionsSaveButton"
import {
  useViewInRoom,
  ViewInRoomFragmentContainer,
} from "v2/Components/ViewInRoom/ViewInRoom"
import { getENV } from "v2/Utils/getENV"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork
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
      flow: AnalyticsSchema.Flow.ArtworkShare,
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.ShareButton,
      type: AnalyticsSchema.Type.Button,
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
  download?: string
  selected?: boolean
  label?: string
  longestLabel?: string
  Icon?: React.ReactNode
  Component?: typeof UtilButtonButton | typeof UtilButtonLink
  onClick?: () => void
}

type UtilButtonInnerTextProps = Pick<
  UtilButtonProps,
  "label" | "longestLabel"
> &
  TextProps

export const UtilButton: React.ForwardRefExoticComponent<
  UtilButtonProps & {
    ref?: React.Ref<HTMLElement>
  }
> = React.forwardRef(
  (
    {
      href,
      label,
      longestLabel,
      name,
      onClick,
      Icon,
      Component = UtilButtonButton,
      download,
      ...rest
    },
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
        {...(href ? { href, target: "_blank", download } : {})}
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

        <UtilButtonInnerText
          label={label}
          longestLabel={longestLabel}
          variant="xs"
          lineHeight={1}
        />
      </Component>
    )
  }
)

const UtilButtonInnerText: React.FC<UtilButtonInnerTextProps> = ({
  label,
  longestLabel,
  ...rest
}) => {
  if (!label) {
    return null
  }

  if (longestLabel) {
    return (
      <Box position="relative">
        <VisibleText {...rest}>{label}</VisibleText>
        <HiddenText aria-hidden="true" {...rest}>
          {longestLabel}
        </HiddenText>
      </Box>
    )
  }

  return <Text {...rest}>{label}</Text>
}

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

const VisibleText = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const HiddenText = styled(Text)`
  opacity: 0;
  pointer-events: none;
`

ArtworkActionsFragmentContainer.displayName = "ArtworkActions"
