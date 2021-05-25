import { ContextModule } from "@artsy/cohesion"
import { Clickable, Message, Text } from "@artsy/palette"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import React from "react"

export const ZeroState = props => {
  const { is_followed, artist } = props

  return (
    <Message>
      There aren’t any works available by the artist at this time.{" "}
      {!is_followed && (
        <>
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
          to receive notifications when new works are added.
        </>
      )}
    </Message>
  )
}
