import { ContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import { NotificationArtworkList_artworksConnection$key } from "__generated__/NotificationArtworkList_artworksConnection.graphql"
import { NotificationArtwork } from "Components/Notifications/NotificationArtwork"
import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { extractNodes } from "Utils/extractNodes"

interface NotificationArtworkListProps {
  artworksConnection?: NotificationArtworkList_artworksConnection$key | null
}

export const NotificationArtworkList: FC<
  React.PropsWithChildren<NotificationArtworkListProps>
> = props => {
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
