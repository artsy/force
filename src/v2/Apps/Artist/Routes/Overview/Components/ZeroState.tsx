import { ContextModule, Intent } from "@artsy/cohesion"
import { Clickable, Link, Message, Sans } from "@artsy/palette"
import { useSystemContext } from "v2/Artsy"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import React from "react"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"

export const ZeroState = props => {
  const { mediator, user } = useSystemContext()
  const { is_followed, artist } = props

  function handleOpenAuth() {
    openAuthToFollowSave(mediator, {
      entity: artist,
      contextModule: ContextModule.worksForSaleRail,
      intent: Intent.followArtist,
    })
  }

  return (
    <Message justifyContent="center" textSize="4">
      There aren’t any works available by the artist at this time.{" "}
      {!is_followed && (
        <>
          <FollowArtistButton
            artist={artist}
            useDeprecatedButtonStyle={false}
            user={user}
            onOpenAuthModal={() => handleOpenAuth()}
            render={({ name }) => {
              return (
                <Clickable>
                  <Sans size="4" color="black60" weight="regular">
                    Follow <Link>{name}</Link>
                  </Sans>
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
