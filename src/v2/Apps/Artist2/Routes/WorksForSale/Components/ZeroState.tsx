import { ContextModule } from "@artsy/cohesion"
import { Clickable, Flex, Message, Text } from "@artsy/palette"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import React from "react"

export const ZeroState = props => {
  const { isFollowed, artist } = props

  return (
    <Message>
      There aren’t any works available by the artist at this time.{" "}
      {!isFollowed && (
        <Flex>
          <FollowArtistButton
            artist={artist}
            contextModule={ContextModule.worksForSaleRail}
            render={({ name }) => {
              return (
                <Clickable cursor="pointer" textDecoration="underline">
                  <Text>Follow {name}</Text>
                </Clickable>
              )
            }}
          />{" "}
          <Text pl={0.5}>
            to receive notifications when new works are added.
          </Text>
        </Flex>
      )}
    </Message>
  )
}
