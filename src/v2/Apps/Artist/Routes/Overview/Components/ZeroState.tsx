import { ContextModule } from "@artsy/cohesion"
import { Clickable, Message, Sans } from "@artsy/palette"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import React from "react"

export const ZeroState = props => {
  const { is_followed, artist } = props

  return (
    <Message justifyContent="center" textSize="4">
      There aren’t any works available by the artist at this time.{" "}
      {!is_followed && (
        <>
          <FollowArtistButton
            artist={artist}
            contextModule={ContextModule.worksForSaleRail}
            render={({ name }) => {
              return (
                <Sans size="4" color="black60" weight="regular">
                  Follow{" "}
                  <Clickable
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {name}
                  </Clickable>
                </Sans>
              )
            }}
          />{" "}
          to receive notifications when new works are added.
        </>
      )}
    </Message>
  )
}
