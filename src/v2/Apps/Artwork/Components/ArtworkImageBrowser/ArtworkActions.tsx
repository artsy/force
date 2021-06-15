import { ArtworkActions_artwork } from "v2/__generated__/ArtworkActions_artwork.graphql"
import { useSystemContext } from "v2/System"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import {
  SaveButtonFragmentContainer as SaveButton,
  SaveButtonProps,
  SaveButtonState,
} from "v2/Components/Artwork/SaveButton"
import { compact } from "lodash"
import { isNull } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled, { css } from "styled-components"
import { slugify } from "underscore.string"
import { Media } from "v2/Utils/Responsive"
import { ArtworkSharePanelFragmentContainer as ArtworkSharePanel } from "./ArtworkSharePanel"
import { ContextModule } from "@artsy/cohesion"
import {
  BellFillIcon,
  BellIcon,
  Box,
  Clickable,
  DownloadIcon,
  EditIcon,
  Flex,
  GenomeIcon,
  HeartFillIcon,
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
import { Mediator } from "lib/mediator"
import { themeGet } from "@styled-system/theme-get"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork
  user?: User
  mediator?: Mediator
  selectDefaultSlide(): void
}

@track()
export class ArtworkActions extends React.Component<ArtworkActionsProps> {
  @track({
    flow: Schema.Flow.ArtworkShare,
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.ShareButton,
    type: Schema.Type.Button,
  })
  toggleSharePanel() {
    // noop
  }

  get isAdmin() {
    return userIsAdmin(this.props.user)
  }

  get isTeam() {
    return userIsTeam(this.props.user)
  }

  getDownloadableImageUrl() {
    const {
      artwork: { is_downloadable, href, artists, title, date },
    } = this.props

    if (is_downloadable || this.isTeam) {
      // @ts-expect-error STRICT_NULL_CHECK
      const artistNames = artists.map(({ name }) => name).join(", ")
      const filename = slugify(compact([artistNames, title, date]).join(" "))
      const downloadableImageUrl = `${href}/download/${filename}.jpg` // prettier-ignore
      return downloadableImageUrl
    }
  }

  @track({
    flow: Schema.Flow.ArtworkViewInRoom,
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.ViewInRoom,
    type: Schema.Type.Button,
  })
  openViewInRoom() {
    this.props.selectDefaultSlide()

    setTimeout(() => {
      const {
        artwork: { dimensions, image },
        mediator,
      } = this.props

      mediator &&
        mediator.trigger &&
        mediator.trigger("openViewInRoom", {
          dimensions,
          image,
        })
    }, 300)
  }

  renderSaveButton() {
    return (
      <SaveButton
        contextModule={ContextModule.artworkImage}
        artwork={this.props.artwork}
        render={Save(this.props)}
      />
    )
  }

  renderViewInRoomButton() {
    return (
      <UtilButton
        name="viewInRoom"
        onClick={() => this.openViewInRoom()}
        label="View in room"
      />
    )
  }

  renderShareButton() {
    return (
      <Popover
        placement="top"
        title="Share"
        popover={
          <ArtworkSharePanel width={300} pt={1} artwork={this.props.artwork} />
        }
      >
        {({ anchorRef, onVisible }) => {
          return (
            <UtilButton
              ref={anchorRef}
              name="share"
              onClick={() => {
                onVisible()
                this.toggleSharePanel() // Tracking
              }}
              label="Share"
            />
          )
        }}
      </Popover>
    )
  }

  renderDownloadButton() {
    return (
      <UtilButton
        name="download"
        href={this.getDownloadableImageUrl()}
        label="Download"
        Component={UtilButtonLink}
      />
    )
  }

  renderEditButton() {
    const { artwork } = this.props
    if (artwork.partner) {
      const editUrl = `${sd.CMS_URL}/artworks/${artwork.slug}/edit?current_partner_id=${artwork.partner.slug}`
      return (
        <UtilButton
          name="edit"
          href={editUrl}
          label="Edit"
          Component={UtilButtonLink}
        />
      )
    }
  }

  renderGenomeButton() {
    const { artwork } = this.props
    const genomeUrl = `${sd.GENOME_URL}/genome/artworks?artwork_ids=${artwork.slug}`

    return (
      <UtilButton
        name="genome"
        href={genomeUrl}
        label="Genome"
        Component={UtilButtonLink}
      />
    )
  }

  render() {
    const { artwork } = this.props
    const downloadableImageUrl = this.getDownloadableImageUrl()

    const actionsToShow = [
      { name: "save", condition: true, renderer: this.renderSaveButton },
      {
        name: "viewInRoom",
        condition: artwork.is_hangable,
        renderer: this.renderViewInRoomButton,
      },
      { name: "share", condition: true, renderer: this.renderShareButton },
      {
        name: "download",
        condition: !!downloadableImageUrl,
        renderer: this.renderDownloadButton,
      },
      {
        name: "edit",
        condition: this.isAdmin,
        renderer: this.renderEditButton,
      },
      {
        name: "genome",
        condition: this.isAdmin,
        renderer: this.renderGenomeButton,
      },
    ]

    const showableActions = actionsToShow.filter(action => {
      return action.condition
    })

    const initialActions = showableActions.slice(0, 3)
    const moreActions = showableActions.slice(3)

    return (
      <>
        <Container>
          <Join separator={<Spacer mx={0} />}>
            <Media greaterThan="xs">
              <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
                {showableActions.map(action => {
                  return (
                    <React.Fragment key={action.name}>
                      {action.renderer.bind(this)()}
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
                      {action.renderer.bind(this)()}
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
                              {action.renderer.bind(this)()}
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
}

export const ArtworkActionsFragmentContainer = createFragmentContainer(
  (props: ArtworkActionsProps) => {
    const { user, mediator } = useSystemContext()
    return <ArtworkActions user={user!} mediator={mediator!} {...props} />
  },
  {
    artwork: graphql`
      fragment ArtworkActions_artwork on Artwork {
        ...SaveButton_artwork
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
  Component?:
    | typeof UtilButtonButton
    | typeof UtilButtonLink
    | typeof UtilButtonBox
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

const UtilButtonBox = styled(Box)`
  ${utilButtonMixin}
`

const Container = styled(Flex)`
  user-select: none;
  justify-content: center;
  align-items: center;
`

/**
 * Custom renderer for SaveButton
 */
const Save = (actionProps: ArtworkActionsProps) => (
  props: SaveButtonProps,
  state: SaveButtonState
) => {
  // Grab props from ArtworkActions to check if sale is open
  const { sale } = actionProps.artwork
  const isOpenSale = sale && sale.is_auction && !sale.is_closed

  // Check if saved by evaluating props from SaveButton
  const isSaved = isNull(state.is_saved)
    ? props.artwork.is_saved
    : state.is_saved

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  if (isOpenSale) {
    const FilledIcon = () => <BellFillIcon fill="blue100" />
    return (
      <UtilButton
        name="bell"
        Icon={isSaved ? FilledIcon : BellIcon}
        label="Watch lot"
        Component={UtilButtonBox}
      />
    )
  } else {
    const FilledIcon = () => <HeartFillIcon fill="blue100" />
    return (
      <UtilButton
        name="heart"
        Icon={isSaved ? FilledIcon : HeartIcon}
        label="Save"
        Component={UtilButtonBox}
      />
    )
  }
}

ArtworkActionsFragmentContainer.displayName = "ArtworkActions"
