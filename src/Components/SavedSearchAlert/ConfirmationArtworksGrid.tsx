import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"
import ArtworkGrid, {
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import {
  ConfirmationStepFooterContentPlaceholder,
  ConfirmationStepFooterQueryRenderer,
} from "Components/SavedSearchAlert/Components/ConfirmationStepFooter"
import type { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  Column,
  Flex,
  GridColumns,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import type {
  ConfirmationArtworksGridQuery,
  ConfirmationArtworksGridQuery$data,
} from "__generated__/ConfirmationArtworksGridQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"

export const NUMBER_OF_ARTWORKS_TO_SHOW = 10

interface ConfirmationArtworksProps {
  artworksConnection: ConfirmationArtworksGridQuery$data["artworksConnection"]
  alertID: string
  onClose: () => void
}

export const ConfirmationArtworks: FC<
  React.PropsWithChildren<ConfirmationArtworksProps>
> = ({ artworksConnection, alertID, onClose }) => {
  const { clickedArtworkGroup } = useAlertTracking()
  const artworksCount = artworksConnection?.counts?.total ?? 0

  if (artworksCount === 0) {
    return (
      <>
        <Text mb={2} p={2} bg="mono10" color="mono60">
          There aren’t any works available that meet the criteria at this time.
        </Text>

        <ConfirmationStepFooterQueryRenderer
          artworksCount={artworksCount}
          alertID={alertID}
          onClose={onClose}
        />
      </>
    )
  }

  return (
    <Flex flexDirection="column">
      {artworksCount > NUMBER_OF_ARTWORKS_TO_SHOW ? (
        <>
          <Text variant="sm-display" color="mono60">
            {artworksCount} works currently on Artsy match your criteria.
          </Text>
          <Text variant="sm-display" color="mono60">
            See our top picks for you:
          </Text>
        </>
      ) : (
        <>
          <Text variant="sm-display" color="mono60">
            {artworksCount === 1
              ? "You might like this 1 work currently on Artsy that matches your criteria:"
              : `You might like these ${artworksCount} works currently on Artsy that match your criteria:`}
          </Text>
        </>
      )}

      <Spacer y={2} />

      <ArtworkGridContextProvider saveOnlyToDefaultList>
        <GridColumns>
          <Column span={12}>
            <ArtworkGrid
              artworks={artworksConnection as any}
              columnCount={2}
              onBrickClick={artwork =>
                clickedArtworkGroup(artwork.internalID, artwork.slug)
              }
            />
          </Column>
        </GridColumns>
      </ArtworkGridContextProvider>

      <Spacer y={2} />

      <ConfirmationStepFooterQueryRenderer
        artworksCount={artworksCount}
        alertID={alertID}
        onClose={onClose}
      />
    </Flex>
  )
}

interface ConfirmationArtworksGridQueryRendererProps
  extends SearchCriteriaAttributes {
  alertID: string
  onClose: () => void
  excludeArtworkIDs?: string[]
}

export const ConfirmationArtworksGridQueryRenderer: FC<
  React.PropsWithChildren<ConfirmationArtworksGridQueryRendererProps>
> = props => {
  const { excludeArtworkIDs, ...inputProps } = props

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
          first: NUMBER_OF_ARTWORKS_TO_SHOW,
          sort: "-published_at",
          forSale: true,
          excludeArtworkIDs: excludeArtworkIDs ?? [],
          ...inputProps,
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

const ContentPlaceholder: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Flex flexDirection="column">
      <SkeletonText>
        300 works currently on Artsy match your criteria.
      </SkeletonText>
      <SkeletonText>See our top picks for you:</SkeletonText>

      <Spacer y={2} />

      <GridColumns>
        <Column span={12}>
          <ArtworkGridPlaceholder
            columnCount={2}
            amount={NUMBER_OF_ARTWORKS_TO_SHOW}
          />
        </Column>
      </GridColumns>

      <Spacer y={2} />

      <ConfirmationStepFooterContentPlaceholder />
    </Flex>
  )
}
