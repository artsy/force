import {
  BorderBox,
  Box,
  CloseIcon,
  Flex,
  Link,
  Sans,
  Separator,
  space,
} from "@artsy/palette"
import { FollowArtistPopover_artist } from "v2/__generated__/FollowArtistPopover_artist.graphql"
import { FollowArtistPopoverQuery } from "v2/__generated__/FollowArtistPopoverQuery.graphql"
import { SystemContext, SystemContextProps } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React, { SFC, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Provider } from "unstated"
import { FollowArtistPopoverRowFragmentContainer as FollowArtistPopoverRow } from "./FollowArtistPopoverRow"
import { FollowArtistPopoverState } from "./state"

// TODO: Revisit possibility of creating an Artsy popover for it.
const BorderedContainer = styled(BorderBox)`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
`

const Container = Box
const TitleContainer = Box

interface Props extends SystemContextProps {
  artist: FollowArtistPopover_artist
  onClose?: () => void
}

const FollowArtistPopover: SFC<Props> = props => {
  const { artist: suggested, user } = props
  const { related } = suggested
  const suggetionsCount = related.suggestedConnection.edges.length
  if (suggetionsCount === 0) return null
  const excludeArtistIds = related.suggestedConnection.edges.map(
    ({ node: { internalID } }) => {
      return internalID
    }
  )
  return (
    <BorderedContainer>
      <Container>
        <TitleContainer mb={1}>
          <Sans size="3" weight="medium" color="black100">
            Other artists you might like
          </Sans>
          <Box position="absolute" top={space(1)} right={space(1)}>
            <Link onClick={props.onClose}>
              <CloseIcon fill={"black30"} />
            </Link>
          </Box>
        </TitleContainer>
        <Flex flexDirection="column">
          <Provider
            inject={[new FollowArtistPopoverState({ excludeArtistIds })]}
          >
            {related.suggestedConnection.edges.map(
              ({ node: artist }, index) => {
                return (
                  <React.Fragment key={artist.id}>
                    <FollowArtistPopoverRow user={user} artist={artist} />
                    {index < suggetionsCount - 1 && <Separator />}
                  </React.Fragment>
                )
              }
            )}
          </Provider>
        </Flex>
      </Container>
    </BorderedContainer>
  )
}

export const FollowArtistPopoverFragmentContainer = createFragmentContainer(
  FollowArtistPopover,
  {
    artist: graphql`
      fragment FollowArtistPopover_artist on Artist {
        related {
          suggestedConnection(first: 3, excludeFollowedArtists: true) {
            edges {
              node {
                id
                internalID
                ...FollowArtistPopoverRow_artist
              }
            }
          }
        }
      }
    `,
  }
)

export const FollowArtistPopoverQueryRenderer = ({
  artistID,
}: {
  artistID: string
}) => {
  const { relayEnvironment, user } = useContext(SystemContext)
  return (
    <QueryRenderer<FollowArtistPopoverQuery>
      environment={relayEnvironment}
      variables={{ artistID }}
      query={graphql`
        query FollowArtistPopoverQuery($artistID: String!) {
          artist(id: $artistID) {
            ...FollowArtistPopover_artist
          }
        }
      `}
      render={({ props }) => {
        return (
          props && (
            <FollowArtistPopoverFragmentContainer
              artist={props.artist}
              user={user}
            />
          )
        )
      }}
    />
  )
}
