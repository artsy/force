import { storiesOf } from "@storybook/react"
import React from "react"
import { FollowArtistButton } from "../FollowButton/FollowArtistButton"
import { FollowProfileButton } from "../FollowButton/FollowProfileButton"
import { ContextModule, OwnerType } from "@artsy/cohesion"

storiesOf("Components/Follow Button", module)
  .add("Artist", () => {
    return (
      <div style={{ margin: 20 }}>
        <FollowArtistButton
          artist={
            {
              internalID: "damon-zucconi",
              id: "1234",
              is_followed: false,
              counts: { follows: 100 },
            } as any
          }
          trackingData={{
            contextModule: ContextModule.relatedArtistsRail,
            contextOwnerType: OwnerType.home,
            ownerId: "1234",
            ownerSlug: "damon-zucconi"
          }}
        />
        <br />
        <FollowArtistButton
          artist={
            {
              internalID: "damon-zucconi",
              id: "1234",
              is_followed: true,
              counts: { follows: 100 },
            } as any
          }
          trackingData={{
            contextModule: ContextModule.relatedArtistsRail,
            contextOwnerType: OwnerType.home,
            ownerId: "1234",
            ownerSlug: "damon-zucconi"
          }}
        />
      </div>
    )
  })
  .add("Profile", () => {
    return (
      <div style={{ margin: 20 }}>
        <FollowProfileButton
          profile={
            {
              internalID: "casey-kaplan",
              id: "1234",
              is_followed: false,
            } as any
          }
        />
        <br />
        <FollowProfileButton
          profile={
            {
              internalID: "casey-kaplan",
              id: "1234",
              is_followed: true,
            } as any
          }
        />
      </div>
    )
  })
