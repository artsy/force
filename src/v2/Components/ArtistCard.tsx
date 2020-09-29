import { ArtistCard_artist } from "v2/__generated__/ArtistCard_artist.graphql"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { Truncator } from "v2/Components/Truncator"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { Media } from "v2/Utils/Responsive"

import {
  Avatar,
  BorderBox,
  Box,
  Flex,
  Sans,
  Serif,
  Spacer,
  space,
} from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { AuthContextModule } from "@artsy/cohesion"

export interface ArtistCardProps {
  artist: ArtistCard_artist
  contextModule: AuthContextModule
  /** Lazy load the avatar image */
  lazyLoad?: boolean
  onClick?: () => void
}

export class ArtistCard extends React.Component<ArtistCardProps> {
  static defaultProps = {
    lazyLoad: false,
  }

  render() {
    return (
      <RouterLink
        onClick={this.props.onClick}
        to={this.props.artist.href}
        style={{ textDecoration: "none" }}
      >
        <Media at="xs">
          <SmallArtistCard {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <LargeArtistCard {...this.props} />
        </Media>
      </RouterLink>
    )
  }
}

const SingleLineTruncation = styled(Sans)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  text-align: center;
`

export const LargeArtistCard: SFC<ArtistCardProps> = props => (
  <BorderBox hover flexDirection="column" width="100%" height="254px">
    <Flex flexDirection="column" flexGrow={0} alignItems="center" pt={1} mb={1}>
      {props.artist.image && (
        <Box mb={1}>
          <Avatar
            lazyLoad={props.lazyLoad}
            src={get(props.artist.image, i => i.cropped.url)}
          />
        </Box>
      )}

      <Serif size="3t" weight="semibold" textAlign="center">
        <Truncator maxLineCount={2}>{props.artist.name}</Truncator>
      </Serif>

      <SingleLineTruncation size="2">
        {props.artist.formatted_nationality_and_birthday}
      </SingleLineTruncation>
    </Flex>

    <Flex flexDirection="column" alignItems="center" mt="auto">
      <FollowArtistButton
        artist={props.artist}
        contextModule={props.contextModule}
        buttonProps={{
          variant: "secondaryOutline",
          size: "small",
          width: space(9)
        }}
      />
    </Flex>
  </BorderBox>
)

export const SmallArtistCard: SFC<ArtistCardProps> = props => (
  <BorderBox hover width="100%">
    {props.artist.image && (
      <Box mr={2}>
        <Avatar
          lazyLoad={props.lazyLoad}
          size="xs"
          src={get(props.artist.image, i => i.cropped.url)}
        />
      </Box>
    )}
    <Flex flexDirection="column">
      <Serif size="3t" weight="semibold">
        <Truncator maxLineCount={2}>{props.artist.name}</Truncator>
      </Serif>

      <Sans size="1">{props.artist.formatted_nationality_and_birthday}</Sans>

      <Spacer mb={1} />

      <FollowArtistButton
        artist={props.artist}
        contextModule={props.contextModule}
        buttonProps={{
          variant: "secondaryOutline",
          size: "small"
        }}
      />
    </Flex>
  </BorderBox>
)

export const ArtistCardFragmentContainer = createFragmentContainer(
  ArtistCard as React.ComponentType<ArtistCardProps>,
  {
    artist: graphql`
      fragment ArtistCard_artist on Artist {
        name
        slug
        href
        image {
          cropped(width: 400, height: 300) {
            url
          }
        }
        formatted_nationality_and_birthday: formattedNationalityAndBirthday
        ...FollowArtistButton_artist
      }
    `,
  }
)
