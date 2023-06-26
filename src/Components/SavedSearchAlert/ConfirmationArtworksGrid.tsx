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
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { useTranslation } from "react-i18next"
import { extractNodes } from "Utils/extractNodes"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"

interface ConfirmationArtworksProps {
  artworksConnection: ConfirmationArtworksGridQuery$data["artworksConnection"]
}

export const ConfirmationArtworks: FC<ConfirmationArtworksProps> = ({
  artworksConnection,
}) => {
  const { t } = useTranslation()
  const artworksCount = artworksConnection?.counts?.total
  const artworks = extractNodes(artworksConnection!)

  return (
    <Flex flexDirection="column">
      <Text variant="sm-display" color="black60">
        {t("createAlertModal.confirmationStep.artworksMatchCriteria", {
          count: artworksCount,
        })}
      </Text>
      <Text variant="sm-display" color="black60">
        {t("createAlertModal.confirmationStep.seeOurTopPicks")}
      </Text>

      <Spacer y={2} />

      <GridColumns alignItems="flex-end">
        {artworks.map((artwork, index) => {
          return (
            <Column
              span={[6]}
              key={`artwork-${index}`}
              // Fix for issue in Firefox where contents overflow container.
            >
              <ArtworkGridItemFragmentContainer
                artwork={artwork}
                saveOnlyToDefaultList={true}
              />
            </Column>
          )
        })}
      </GridColumns>
    </Flex>
  )
}

export const ConfirmationArtworksGridQueryRenderer: FC<SearchCriteriaAttributes> = props => {
  return (
    <SystemQueryRenderer<ConfirmationArtworksGridQuery>
      placeholder={<ContentPlaceholder />}
      query={graphql`
        query ConfirmationArtworksGridQuery($input: FilterArtworksInput) {
          artworksConnection(input: $input) {
            counts {
              total
            }

            edges {
              node {
                ...GridItem_artwork
              }
            }
          }
        }
      `}
      variables={{
        input: {
          first: 10,
          sort: "-published_at",
          forSale: true,
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

      <ArtworkGridPlaceholder columnCount={2} amount={10} />
    </Flex>
  )
}
