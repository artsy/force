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

const ConfirmationArtworks: FC<ConfirmationArtworksProps> = ({
  artworksConnection,
}) => {
  const artworksCount = artworksConnection?.counts?.total

  return (
    <Flex flexDirection="column">
      <Text variant="sm-display" color="black60">
        {artworksCount} works currently on Artsy match your criteria.
      </Text>
      <Text variant="sm-display" color="black60">
        See our top picks for you:
      </Text>

      <Spacer y={2} />

      <ArtworkGrid width="90%" artworks={artworksConnection!} columnCount={2} />
    </Flex>
  )
}

interface ConfirmationArtworksGridQueryRendererProps {
  artistIDs?: string[] | null
  locationCities?: string[] | null
  colors?: string[] | null
  partnerIDs?: string[] | null
  additionalGeneIDs?: string[] | null
  attributionClass?: string[] | null
  majorPeriods?: string[] | null
  acquireable?: boolean | null
  atAuction?: boolean | null
  inquireableOnly?: boolean | null
  offerable?: boolean | null
  materialsTerms?: string[] | null
  priceRange?: string | null
  sizes?: string[] | null
  height?: string | null
  width?: string | null
}

export const ConfirmationArtworksGridQueryRenderer: FC<ConfirmationArtworksGridQueryRendererProps> = props => {
  return (
    <SystemQueryRenderer<ConfirmationArtworksGridQuery>
      placeholder={<ContentPlaceholder />}
      query={graphql`
        query ConfirmationArtworksGridQuery($input: FilterArtworksInput) {
          artworksConnection(input: $input) {
            counts {
              total
            }
            ...ArtworkGrid_artworks
          }
        }
      `}
      variables={{
        input: {
          first: 20,
          sort: "-published_at",
          ...props,
        },
      }}
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

      <Spacer y={2} />

      <ArtworkGridPlaceholder columnCount={2} amount={20} />
    </Flex>
  )
}
