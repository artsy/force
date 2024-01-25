import { ContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationArtworkList_artworksConnection$key } from "__generated__/NotificationArtworkList_artworksConnection.graphql"
import { NotificationArtwork } from "Components/Notifications/NotificationArtwork"

interface NotificationArtworkListProps {
  artworksConnection?: NotificationArtworkList_artworksConnection$key | null
}

export const NotificationArtworkList: FC<NotificationArtworkListProps> = props => {
  const artworksConnection = useFragment(
    notificationArtworkListFragment,
    props.artworksConnection
  )

  const artworks = extractNodes(artworksConnection)

  return (
    <Flex flexDirection="column" alignItems="center">
      {artworks.map(artwork => (
        <NotificationArtwork
          key={artwork.internalID}
          artwork={artwork}
          contextModule={ContextModule.activity}
        />
      ))}
    </Flex>
  )
}

export const notificationArtworkListFragment = graphql`
  fragment NotificationArtworkList_artworksConnection on ArtworkConnection {
    edges {
      node {
        ...NotificationArtwork_artwork
        internalID
      }
    }
  }
`
