import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { storiesOf } from "storybook/storiesOf"

import { ArtistConsignButtonQuery } from "v2/__generated__/ArtistConsignButtonQuery.graphql"
import { useSystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"

import {
  ArtistConsignButtonFragmentContainer,
  ArtistConsignButtonLarge,
  ArtistConsignButtonProps,
  ArtistConsignButtonSmall,
} from "v2/Apps/Artist/Components/ArtistConsignButton"

export const ArtistConsignButtonQueryRenderer: React.FC<Partial<
  ArtistConsignButtonProps
> & {
  artistID: string
}> = ({ artistID }) => {
  const { relayEnvironment } = useSystemContext()
  return (
    <QueryRenderer<ArtistConsignButtonQuery>
      environment={relayEnvironment}
      query={graphql`
        query ArtistConsignButtonQuery($artistID: String!) @raw_response_type {
          artist(id: $artistID) {
            ...ArtistConsignButton_artist
          }
        }
      `}
      variables={{
        artistID,
      }}
      render={renderWithLoadProgress(ArtistConsignButtonFragmentContainer)}
    />
  )
}

storiesOf("Apps/Artist/Components/ArtistConsignButton", module)
  .add("Top 20", () => {
    return <ArtistConsignButtonQueryRenderer artistID="alex-katz" />
  })
  .add("All others", () => {
    return <ArtistConsignButtonQueryRenderer artistID="andy-warhol" />
  })
  .add("Large Button", () => {
    return (
      <ArtistConsignButtonLarge
        trackGetStartedClick={(x: any) => x}
        artist={
          {
            name: "Alex Katz",
            href: "/artist/alex-katz",
            image: { cropped: { url: "https://via.placeholder.com/50x50" } },
          } as any
        }
      />
    )
  })
  .add("Small Button", () => {
    return (
      <ArtistConsignButtonSmall
        trackGetStartedClick={(x: any) => x}
        artist={
          {
            name: "Alex Katz",
            href: "/artist/alex-katz",
            image: { cropped: { url: "https://via.placeholder.com/50x50" } },
          } as any
        }
      />
    )
  })
