import React from "react"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { FairExhibitorRailArtworksQuery } from "v2/__generated__/FairExhibitorRailArtworksQuery.graphql"
import { FairExhibitorRailArtworks_show } from "v2/__generated__/FairExhibitorRailArtworks_show.graphql"
import { FAIR_EXHIBITOR_IMAGE_HEIGHT } from "./FairExhibitorRail"
import { FairExhibitorRailPlaceholder } from "./FairExhibitorRailPlaceholder"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { ContextModule } from "@artsy/cohesion"

export interface FairExhibitorRailArtworksProps {
  show: FairExhibitorRailArtworks_show
}

const FairExhibitorRailArtworks: React.FC<FairExhibitorRailArtworksProps> = ({
  show,
}) => {
  return (
    <Carousel arrowHeight={FAIR_EXHIBITOR_IMAGE_HEIGHT}>
      {show.artworks.edges.map(({ artwork }) => {
        return (
          <FillwidthItem
            contextModule={ContextModule.fairRail}
            artwork={artwork}
            imageHeight={FAIR_EXHIBITOR_IMAGE_HEIGHT}
            hidePartnerName
            lazyLoad
          />
        )
      })}
    </Carousel>
  )
}

export const FairExhibitorRailArtworksFragmentContainer = createFragmentContainer(
  FairExhibitorRailArtworks,
  {
    show: graphql`
      fragment FairExhibitorRailArtworks_show on Show {
        artworks: artworksConnection(first: 20) {
          edges {
            artwork: node {
              ...FillwidthItem_artwork
            }
          }
        }
      }
    `,
  }
)

export const FairExhibitorRailArtworksQueryRenderer: React.FC<{
  id: string
}> = ({ id }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<FairExhibitorRailArtworksQuery>
      environment={relayEnvironment}
      query={graphql`
        query FairExhibitorRailArtworksQuery($id: String!) {
          show(id: $id) {
            ...FairExhibitorRailArtworks_show
          }
        }
      `}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props) return <FairExhibitorRailPlaceholder />
        return <FairExhibitorRailArtworksFragmentContainer {...props} />
      }}
    />
  )
}
