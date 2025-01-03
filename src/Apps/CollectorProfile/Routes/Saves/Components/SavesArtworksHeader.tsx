import HideIcon from "@artsy/icons/HideIcon"
import { Clickable, SkeletonText, Stack, Text, Tooltip } from "@artsy/palette"
import { ArtworkListContextualMenu } from "Apps/CollectorProfile/Routes/Saves/Components/Actions/ArtworkListContextualMenu"
import { ClientSuspense } from "Components/ClientSuspense"
import type { SavesArtworksHeaderQuery } from "__generated__/SavesArtworksHeaderQuery.graphql"
import type { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

interface SavesArtworksHeaderProps {
  id: string
}

const SavesArtworksHeader: FC<
  React.PropsWithChildren<SavesArtworksHeaderProps>
> = ({ id }) => {
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

const SavesArtworksHeaderSkeleton: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <SkeletonText variant="lg">Loading...</SkeletonText>
}

export const SavesArtworksHeaderQueryRenderer: FC<
  React.PropsWithChildren<SavesArtworksHeaderProps>
> = props => {
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
