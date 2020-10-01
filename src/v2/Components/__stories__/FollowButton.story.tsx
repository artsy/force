import { storiesOf } from "@storybook/react"
import React from "react"
import { FollowArtistButton } from "../FollowButton/FollowArtistButton"
import { FollowProfileButton } from "../FollowButton/FollowProfileButton"
import { ContextModule } from "@artsy/cohesion"

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
          contextModule={ContextModule.relatedArtistsRail}
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
          contextModule={ContextModule.relatedArtistsRail}
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
              name: "Casey Kaplan",
              slug: "casey-kaplan",
              internalID: "1234",
              id: "$1234",
              is_followed: false,
            } as any
          }
          contextModule={ContextModule.aboutTheWork}
        />
        <br />
        <FollowProfileButton
          profile={
            {
              name: "Casey Kaplan",
              slug: "casey-kaplan",
              internalID: "1234",
              id: "$1234",
              is_followed: true,
            } as any
          }
          contextModule={ContextModule.aboutTheWork}
        />
      </div>
    )
  })
