import { ArtworkListContextualMenu } from "Apps/CollectorProfile/Routes/Saves/Components/Actions/ArtworkListContextualMenu"
import { ClientSuspense } from "Components/ClientSuspense"
import { ShareCollectionDialog } from "Components/ShareCollectionDialog"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import HideIcon from "@artsy/icons/HideIcon"
import ShareIcon from "@artsy/icons/ShareIcon"
import {
  Button,
  Clickable,
  SkeletonText,
  Stack,
  Text,
  Tooltip,
} from "@artsy/palette"
import type {
  SavesArtworksHeaderQuery,
  SavesArtworksHeaderQuery$data,
} from "__generated__/SavesArtworksHeaderQuery.graphql"
import { type FC, useState } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { useTracking } from "react-tracking"

interface SavesArtworksHeaderProps {
  id: string
}

const SavesArtworksHeader: FC<
  React.PropsWithChildren<SavesArtworksHeaderProps>
> = ({ id }) => {
  const { me } = useLazyLoadQuery<SavesArtworksHeaderQuery>(QUERY, {
    id,
  })
  const { trackEvent } = useTracking()

  const collection = me?.collection

  const [mode, setMode] = useState<"Idle" | "Share">("Idle")

  const handleShare = () => {
    trackEvent(tracks.clickedShareButton(collection))

    setMode("Share")
  }

  if (!collection) {
    return null
  }

  return (
    <>
      <Stack
        gap={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack gap={2} flexDirection="row" alignItems="center">
          <Stack gap={0.5} flexDirection="row" alignItems="center">
            <Text variant="lg">{collection.name}</Text>

            {!collection.shareableWithPartners && (
              <Tooltip
                pointer
                variant="defaultDark"
                placement="bottom-start"
                content={
                  <Text variant="xs">
                    Artworks in this list are only visible to you and not
                    eligible to receive offers.
                  </Text>
                }
              >
                <Clickable style={{ lineHeight: 0 }}>
                  <HideIcon flexShrink={0} data-testid="hide-icon" />
                </Clickable>
              </Tooltip>
            )}
          </Stack>

          <Button
            size="small"
            variant="secondaryBlack"
            onClick={handleShare}
            Icon={ShareIcon}
          >
            {collection.private ? "Share" : "Shared"}
          </Button>
        </Stack>

        {!collection.default && collection && (
          <ArtworkListContextualMenu artworkList={collection} />
        )}
      </Stack>

      {mode === "Share" && collection && (
        <ShareCollectionDialog
          onClose={() => setMode("Idle")}
          collection={collection}
        />
      )}
    </>
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
        private
        shareableWithPartners
        slug
      }
    }
  }
`

const tracks = {
  clickedShareButton: (
    collection: NonNullable<SavesArtworksHeaderQuery$data["me"]>["collection"],
  ) => ({
    action: ActionType.clickedShareButton,
    context_module: ContextModule.saves,
    context_owner_type: OwnerType.saves,
    context_owner_id: collection?.internalID,
    context_owner_slug: collection?.slug,
  }),
}
