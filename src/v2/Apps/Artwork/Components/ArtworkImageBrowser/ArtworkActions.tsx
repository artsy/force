import { ArtworkActions_artwork } from "v2/__generated__/ArtworkActions_artwork.graphql"
import { SystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import SaveButton, { SaveProps, SaveState } from "v2/Components/Artwork/Save"
import { compact } from "lodash"
import { isNull } from "lodash"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { Media } from "v2/Utils/Responsive"
import { ArtworkSharePanelFragmentContainer as ArtworkSharePanel } from "./ArtworkSharePanel"

import { ContextModule } from "@artsy/cohesion"
import {
  BellFillIcon,
  BellIcon,
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
  color,
} from "@artsy/palette"
import { userIsAdmin, userIsTeam } from "v2/Utils/user"
import { ArtworkPopoutPanel } from "./ArtworkPopoutPanel"
import { Mediator } from "lib/mediator"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork
  user?: User
  mediator?: Mediator
  selectDefaultSlide(): void
}

interface ArtworkActionsState {
  showSharePanel: boolean
  showMorePanel: boolean
}

@track()
export class ArtworkActions extends React.Component<
  ArtworkActionsProps,
  ArtworkActionsState
> {
  state = {
    showSharePanel: false,
    showMorePanel: false,
  }

  @track({
    flow: Schema.Flow.ArtworkShare,
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.ShareButton,
    type: Schema.Type.Button,
  })
  toggleSharePanel() {
    const showSharePanel = !this.state.showSharePanel
    this.setState({
      showSharePanel,
      showMorePanel: false,
    })
  }

  toggleMorePanel() {
    const showMorePanel = !this.state.showMorePanel
    this.setState({ showMorePanel, showSharePanel: false })
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
      <UtilButton
        name="share"
        onClick={this.toggleSharePanel.bind(this)}
        label="Share"
      />
    )
  }

  renderDownloadButton() {
    return (
      <UtilButton
        name="download"
        href={this.getDownloadableImageUrl()}
        label="Download"
      />
    )
  }

  renderEditButton() {
    const { artwork } = this.props
    if (artwork.partner) {
      const editUrl = `${sd.CMS_URL}/artworks/${artwork.slug}/edit?current_partner_id=${artwork.partner.slug}` // prettier-ignore
      return <UtilButton name="edit" href={editUrl} label="Edit" />
    }
  }

  renderGenomeButton() {
    const { artwork } = this.props
    const genomeUrl = `${sd.GENOME_URL}/genome/artworks?artwork_ids=${artwork.slug}` // prettier-ignore

    return <UtilButton name="genome" href={genomeUrl} label="Genome" />
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
              <Flex>
                {showableActions.map(action => {
                  return (
                    <div key={action.name}>{action.renderer.bind(this)()}</div>
                  )
                })}
              </Flex>
            </Media>

            <Media at="xs">
              <Flex>
                {initialActions.map(action => {
                  return (
                    <div key={action.name}>{action.renderer.bind(this)()}</div>
                  )
                })}

                {moreActions && moreActions.length > 0 && (
                  <UtilButton
                    name="more"
                    onClick={this.toggleMorePanel.bind(this)}
                  />
                )}
              </Flex>
            </Media>
          </Join>

          {this.state.showSharePanel && (
            <ArtworkSharePanel
              artwork={this.props.artwork}
              onClose={this.toggleSharePanel.bind(this)}
            />
          )}

          {this.state.showMorePanel && (
            <ArtworkPopoutPanel
              title="More actions"
              onClose={this.toggleMorePanel.bind(this)}
            >
              <Flex flexDirection="row" flexWrap="wrap">
                {moreActions.map(action => {
                  return (
                    <Flex flexDirection="row" flexBasis="50%" key={action.name}>
                      {action.renderer.bind(this)()}
                    </Flex>
                  )
                })}
              </Flex>
            </ArtworkPopoutPanel>
          )}
        </Container>
      </>
    )
  }
}

export const ArtworkActionsFragmentContainer = createFragmentContainer(
  (props: ArtworkActionsProps) => {
    const { user, mediator } = useContext(SystemContext)
    return <ArtworkActions user={user} mediator={mediator} {...props} />
  },
  {
    artwork: graphql`
      fragment ArtworkActions_artwork on Artwork {
        ...Save_artwork
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
  onClick?: () => void
  selected?: boolean
  label?: string
  Icon?: React.ReactNode
}

export class UtilButton extends React.Component<
  UtilButtonProps,
  { hovered: boolean }
> {
  state = {
    hovered: false,
  }

  render() {
    const { href, label, name, onClick, Icon, ...props } = this.props

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
    let ActionIcon
    if (Icon) {
      ActionIcon = Icon
    } else {
      ActionIcon = getIcon()
    }

    const defaultFill = name === "more" ? null : "black100"
    const fill = this.state.hovered ? "purple100" : defaultFill

    return (
      <UtilButtonContainer
        p={1}
        pt={0}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseOut={() =>
          this.setState({
            hovered: false,
          })
        }
        onClick={onClick}
      >
        {href ? (
          <UtilButtonLink className="noUnderline" href={href} target="_blank">
            <ActionIcon {...props} fill={"black100"} />
            {label && (
              <Text variant="caption" pl={0.5} pt="1px">
                {label}
              </Text>
            )}
          </UtilButtonLink>
        ) : (
          <>
            <ActionIcon {...props} fill={fill} />
            {label && (
              <Text variant="caption" pl={0.5} pt="1px">
                {label}
              </Text>
            )}
          </>
        )}
      </UtilButtonContainer>
    )
  }
}

const UtilButtonLink = styled(Link)`
  display: flex;

  &:hover {
    color: ${color("purple100")} !important;
    text-decoration: none !important;
  }
`

const UtilButtonContainer = styled(Flex)`
  cursor: pointer;
  justify-content: center;

  &:hover {
    color: ${color("purple100")};
  }
`

const Container = styled(Flex).attrs({
  justifyContent: "center",
  mb: 2,
  ml: 0.5,
  pt: 3,
})`
  position: relative;
  user-select: none;
`

/**
 * Custom renderer for SaveButton
 */
const Save = (actionProps: ArtworkActionsProps) => (
  props: SaveProps,
  state: SaveState
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
    const FilledIcon = () => <BellFillIcon fill="purple100" />
    return (
      <UtilButton
        name="bell"
        Icon={isSaved ? FilledIcon : BellIcon}
        label="Watch lot"
      />
    )
  } else {
    const FilledIcon = () => <HeartFillIcon fill="purple100" />
    return (
      <UtilButton
        name="heart"
        Icon={isSaved ? FilledIcon : HeartIcon}
        label="Save"
      />
    )
  }
}

ArtworkActionsFragmentContainer.displayName = "ArtworkActions"
