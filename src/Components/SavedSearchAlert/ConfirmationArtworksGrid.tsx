import { Flex, SkeletonText, Spacer, Text } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { graphql } from "react-relay"
import {
  ConfirmationArtworksGridQuery,
  ConfirmationArtworksGridQuery$data,
} from "__generated__/ConfirmationArtworksGridQuery.graphql"
import ArtworkGrid, {
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"

interface ConfirmationArtworksProps {
  artworksConnection: ConfirmationArtworksGridQuery$data["artworksConnection"]
}

// TODO: Text to a separate component
const ConfirmationArtworks: FC<ConfirmationArtworksProps> = ({
  artworksConnection,
}) => {
  // TODO: placeholder if connection is empty

  return (
    <Flex flexDirection="column">
      <Text variant="sm-display" color="black60">
        300 works currently on Artsy match your criteria.
      </Text>
      <Text variant="sm-display" color="black60">
        See our top picks for you:
      </Text>
      <Spacer y={2} />

      <ArtworkGrid artworks={artworksConnection!} columnCount={2} />
    </Flex>
  )
}

interface ConfirmationArtworksGridQueryRendererProps {
  searchCriteriaId: string
}

export const ConfirmationArtworksGridQueryRenderer: FC<ConfirmationArtworksGridQueryRendererProps> = props => {
  return (
    <SystemQueryRenderer<ConfirmationArtworksGridQuery>
      placeholder={<ContentPlaceholder />}
      query={graphql`
        query ConfirmationArtworksGridQuery {
          artworksConnection(first: 20) {
            ...ArtworkGrid_artworks
          }
        }
      `}
      render={({ props: relayProps, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!relayProps?.artworksConnection) {
          return <ContentPlaceholder />
        }

        return (
          <ConfirmationArtworks
            artworksConnection={relayProps.artworksConnection}
            {...props}
          />
        )
      }}
    />
  )
}

const ContentPlaceholder: FC = () => {
  return (
    <Flex flexDirection="column">
      <SkeletonText>
        300 works currently on Artsy match your criteria.
      </SkeletonText>
      <SkeletonText>See our top picks for you:</SkeletonText>

      <ArtworkGridPlaceholder columnCount={2} amount={20} />
    </Flex>
  )
}
