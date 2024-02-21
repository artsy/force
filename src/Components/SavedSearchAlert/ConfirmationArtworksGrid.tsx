import {
  Column,
  Flex,
  GridColumns,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
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
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { useTranslation } from "react-i18next"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import {
  ConfirmationStepFooterContentPlaceholder,
  ConfirmationStepFooterQueryRenderer,
} from "Components/SavedSearchAlert/Components/ConfirmationStepFooter"
import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"

export const NUMBER_OF_ARTWORKS_TO_SHOW = 10

interface ConfirmationArtworksProps {
  artworksConnection: ConfirmationArtworksGridQuery$data["artworksConnection"]
  alertID: string
  onClose: () => void
}

export const ConfirmationArtworks: FC<ConfirmationArtworksProps> = ({
  artworksConnection,
  alertID,
  onClose,
}) => {
  const { t } = useTranslation()
  const { clickedArtworkGroup } = useAlertTracking()
  const artworksCount = artworksConnection?.counts?.total ?? 0

  if (artworksCount === 0) {
    return (
      <>
        <Text mb={2} p={2} bg="black10" color="black60">
          {t("createAlertModal.confirmationStep.noMatches")}
        </Text>

        <ConfirmationStepFooterQueryRenderer
          artworksCount={artworksCount!}
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
          <Text variant="sm-display" color="black60">
            {t("createAlertModal.confirmationStep.manyMatchingArtworks", {
              count: artworksCount,
            })}
          </Text>
          <Text variant="sm-display" color="black60">
            {t("createAlertModal.confirmationStep.seeOurTopPicks")}
          </Text>
        </>
      ) : (
        <>
          <Text variant="sm-display" color="black60">
            {t("createAlertModal.confirmationStep.fewMatchingArtworks", {
              count: artworksCount,
            })}
          </Text>
        </>
      )}

      <Spacer y={2} />

      <ArtworkGridContextProvider saveOnlyToDefaultList>
        <GridColumns>
          <Column span={12}>
            <ArtworkGrid
              artworks={artworksConnection!}
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
        artworksCount={artworksCount!}
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

export const ConfirmationArtworksGridQueryRenderer: FC<ConfirmationArtworksGridQueryRendererProps> = props => {
  const { onClose, excludeArtworkIDs, alertID, ...inputProps } = props

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

const ContentPlaceholder: FC = () => {
  const { t } = useTranslation()

  return (
    <Flex flexDirection="column">
      <SkeletonText>
        {t("createAlertModal.confirmationStep.artworksMatchCriteria", {
          count: 300,
        })}
      </SkeletonText>
      <SkeletonText>
        {t("createAlertModal.confirmationStep.seeOurTopPicks")}
      </SkeletonText>

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
