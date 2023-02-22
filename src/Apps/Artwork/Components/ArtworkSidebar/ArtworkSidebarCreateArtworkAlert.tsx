import { Flex, Separator, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarCreateArtworkAlert_artwork$data } from "__generated__/ArtworkSidebarCreateArtworkAlert_artwork.graphql"
import {
  SavedSearchEntity,
  SavedSearchEntityCriteria,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { compact } from "lodash"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { OwnerType } from "@artsy/cohesion"
import { SavedSearchCreateAlertButton } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButton"
import { ContextModule, Intent } from "@artsy/cohesion"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { useTranslation } from "react-i18next"

interface ArtworkSidebarCreateArtworkAlertProps {
  artwork: ArtworkSidebarCreateArtworkAlert_artwork$data
}

const ArtworkSidebarCreateArtworkAlert: React.FC<ArtworkSidebarCreateArtworkAlertProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  let aggregations: Aggregations = []
  let additionalGeneIDs: string[] = []
  const artists = compact(artwork.artists)
  const attributionClass = compact([artwork.attributionClass?.internalID])
  const artistIDs = artists.map(artist => artist.internalID)
  const placeholder = `Artworks like: ${artwork.title!}`

  const defaultArtistsCriteria: SavedSearchEntityCriteria[] = artists.map(
    artist => ({
      value: artist.internalID,
      displayValue: artist.name ?? "",
    })
  )

  const entity: SavedSearchEntity = {
    placeholder,
    defaultCriteria: {
      artistIDs: defaultArtistsCriteria,
    },
    owner: {
      type: OwnerType.artwork,
      slug: artwork.slug,
      id: artwork.internalID,
      name: artwork.title!,
    },
  }

  if (
    artwork.mediumType?.filterGene?.name &&
    artwork.mediumType?.filterGene.slug
  ) {
    additionalGeneIDs = [artwork.mediumType.filterGene.slug]
    aggregations = [
      {
        slice: "MEDIUM",
        counts: [
          {
            name: artwork.mediumType.filterGene.name,
            value: artwork.mediumType.filterGene.slug,
            count: 0,
          },
        ],
      },
    ]
  }

  const criteria: SearchCriteriaAttributes = {
    artistIDs,
    attributionClass,
    additionalGeneIDs,
  }
  const allowedCriteria = getAllowedSearchCriteria(criteria)

  return (
    <>
      <Separator />
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        // FIXME: Remove
        my={2}
      >
        <Text variant="xs" mr={2}>
          {t("artworkPage.sidebar.createAlert.description")}
        </Text>
        <SavedSearchCreateAlertButton
          entity={entity}
          criteria={allowedCriteria}
          aggregations={aggregations}
          authDialogOptions={{
            options: {
              title: "Sign up to create your alert",
              afterAuthAction: {
                action: "createAlert",
                kind: "artworks",
                objectId: artwork.internalID,
              },
            },
            analytics: {
              contextModule: ContextModule.artworkSidebar,
              intent: Intent.createAlert,
            },
          }}
        />
      </Flex>
    </>
  )
}

export const ArtworkSidebarCreateArtworkAlertFragmentContainer = createFragmentContainer(
  ArtworkSidebarCreateArtworkAlert,
  {
    artwork: graphql`
      fragment ArtworkSidebarCreateArtworkAlert_artwork on Artwork {
        internalID
        title
        slug
        artists {
          internalID
          name
          slug
        }
        attributionClass {
          internalID
        }
        mediumType {
          filterGene {
            slug
            name
          }
        }
      }
    `,
  }
)
