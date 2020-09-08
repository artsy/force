import { storiesOf } from "@storybook/react"
import React from "react"
import { FollowArtistButton } from "../FollowButton/FollowArtistButton"
import { FollowProfileButton } from "../FollowButton/FollowProfileButton"

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
