import HideIcon from "@artsy/icons/HideIcon"
import { Text, Stack, Clickable, Tooltip, SkeletonText } from "@artsy/palette"
import { ArtworkListContextualMenu } from "Apps/CollectorProfile/Routes/Saves/Components/Actions/ArtworkListContextualMenu"
import { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { SavesArtworksHeaderQuery } from "__generated__/SavesArtworksHeaderQuery.graphql"
import { ClientSuspense } from "Components/ClientSuspense"

interface SavesArtworksHeaderProps {
  id: string
}

const SavesArtworksHeader: FC<SavesArtworksHeaderProps> = ({ id }) => {
  const { me } = useLazyLoadQuery<SavesArtworksHeaderQuery>(QUERY, {
    id,
  })

  const collection = me?.collection

  if (!collection) {
    return null
  }

  return (
    <Stack
      gap={2}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack gap={0.5} flexDirection="row" alignItems="center">
        <Text variant="lg">{collection.name}</Text>

        {!collection.shareableWithPartners && (
          <Tooltip
            pointer
            variant="defaultDark"
            placement="bottom-start"
            content={
              <Text variant="xs">
                Artworks in this list are only visible to you and not eligible
                to receive offers.
              </Text>
            }
          >
            <Clickable style={{ lineHeight: 0 }}>
              <HideIcon flexShrink={0} data-testid="hide-icon" />
            </Clickable>
          </Tooltip>
        )}
      </Stack>

      {!collection.default && collection && (
        <ArtworkListContextualMenu artworkList={collection} />
      )}
    </Stack>
  )
}

const SavesArtworksHeaderSkeleton: FC = () => {
  return <SkeletonText variant="lg">Loading...</SkeletonText>
}

export const SavesArtworksHeaderQueryRenderer: FC<SavesArtworksHeaderProps> = props => {
  return (
    <ClientSuspense fallback={<SavesArtworksHeaderSkeleton />}>
      <SavesArtworksHeader {...props} />
    </ClientSuspense>
  )
}

const QUERY = graphql`
  query SavesArtworksHeaderQuery($id: String!) {
    me {
      collection(id: $id) {
        internalID
        name
        default
        shareableWithPartners
      }
    }
  }
`
