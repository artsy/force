import { Box, Flex, Image, Sans, Serif } from "@artsy/palette"
import { CurrentEvent_artist } from "v2/__generated__/CurrentEvent_artist.graphql"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"

export interface CurrentEventProps {
  artist: CurrentEvent_artist
}

export class CurrentEvent extends Component<CurrentEventProps> {
  render() {
    return (
      <Media greaterThan="xs">
        <LargeCurrentEvent {...this.props} />
      </Media>
    )
  }
}

// const track: Track<CurrentEventProps> = _track

@track()
export class LargeCurrentEvent extends Component<CurrentEventProps> {
  @track<CurrentEventProps>(props => ({
    action_type: Schema.ActionType.Click,
    subject:
      props.artist.currentEvent.event.__typename === "Sale"
        ? // TODO: These are not action names!
          Schema.ActionName.InSale
        : Schema.ActionName.InShow,
    destination_path: props.artist.currentEvent.href,
  }))
  handleClick() {
    // no-op
  }

  render() {
    const props = this.props
    if (!props.artist.currentEvent) {
      return null
    }
    const {
      currentEvent: { image, status, name, details, partner, href },
    } = props.artist

    return (
      <a
        href={href}
        className="noUnderline"
        onClick={this.handleClick.bind(this)}
      >
        <Flex flexDirection="column">
          {image && (
            <Box width="100%" height="auto">
              <Image src={image.resized.url} alt={name} width="100%" mb={1} />
            </Box>
          )}
          <Sans size="2" weight="medium" my={0.5}>
            {status}
          </Sans>
          <Serif size="3t">{name}</Serif>
          {partner && (
            <Serif size="2" color="black60">
              {partner}
            </Serif>
          )}
          <Serif size="2" color="black60">
            {details}
          </Serif>
        </Flex>
      </a>
    )
  }
}

export const CurrentEventFragmentContainer = createFragmentContainer(
  CurrentEvent,
  {
    artist: graphql`
      fragment CurrentEvent_artist on Artist {
        currentEvent {
          event {
            __typename
          }
          image {
            resized(width: 300) {
              url
            }
          }
          name
          status
          details
          partner
          href
        }
      }
    `,
  }
)
