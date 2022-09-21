import * as React from "react"
import { Message } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowArtworksEmptyState_show$data } from "__generated__/ShowArtworksEmptyState_show.graphql"

interface ShowArtworksEmptyStateProps {
  show: ShowArtworksEmptyState_show$data
}

export const ShowArtworksEmptyState: React.FC<ShowArtworksEmptyStateProps> = ({
  show,
}) => {
  const message = [
    `This ${
      show.isFairBooth ? "fair booth" : "show"
    } is currently unavailable.`,

    ...(show.status !== "closed"
      ? [
          `Please check back closer to the ${
            show.isFairBooth ? "fair" : "show"
          } for artworks.`,
        ]
      : []),
  ].join(" ")

  return <Message>{message}</Message>
}

export const ShowArtworksEmptyStateFragmentContainer = createFragmentContainer(
  ShowArtworksEmptyState,
  {
    show: graphql`
      fragment ShowArtworksEmptyState_show on Show {
        isFairBooth
        status
      }
    `,
  }
)
