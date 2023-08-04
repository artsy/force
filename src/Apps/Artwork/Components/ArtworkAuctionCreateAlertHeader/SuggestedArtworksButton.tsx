import { Box, Button } from "@artsy/palette"
import { SuggestedArtworksModal } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModal"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import {
  SavedSearchEntity,
  SavedSearchEntityCriteria,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { compact } from "lodash"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SuggestedArtworksButton_artwork$data } from "__generated__/SuggestedArtworksButton_artwork.graphql"
import { OwnerType } from "@artsy/cohesion"
import { useTranslation } from "react-i18next"

interface SuggestedArtworksButtonProps {
  artwork: SuggestedArtworksButton_artwork$data
}

const SuggestedArtworksButton: FC<SuggestedArtworksButtonProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  const [modalIsOpened, setModalIsOpened] = useState(false)

  // TODO: extract criteria and entity gathering to a function
  // can be re-used across different components
  const artists = compact(artwork.artists)
  const attributionClass = compact([artwork.attributionClass?.internalID])
  const artistIDs = artists.map(artist => artist.internalID)
  const firstArtistSlug = artists[0]?.slug
  let additionalGeneIDs: string[] = []
  if (
    artwork.mediumType?.filterGene?.name &&
    artwork.mediumType?.filterGene.slug
  ) {
    additionalGeneIDs = [artwork.mediumType.filterGene.slug]
  }

  const criteria: SearchCriteriaAttributes = {
    artistIDs,
    attributionClass,
    additionalGeneIDs,
  }
  const allowedCriteria = getAllowedSearchCriteria(criteria)

  const defaultArtistsCriteria: SavedSearchEntityCriteria[] = artists.map(
    artist => ({
      value: artist.internalID,
      displayValue: artist.name ?? "",
    })
  )

  const entity: SavedSearchEntity = {
    placeholder: defaultArtistsCriteria[0].displayValue,
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

  const handleClick = e => {
    e.preventDefault()
    setModalIsOpened(true)
  }

  const handleCloseModal = () => {
    setModalIsOpened(false)
  }

  return (
    <>
      <Media greaterThan="xs">
        <Box textAlign="center">
          <RouterLink to="" onClick={handleClick}>
            {t("artworkPage.artworkAuctionCreateAlertHeader.seeMoreButton")}
          </RouterLink>
        </Box>
      </Media>
      <Media at="xs">
        <Button
          variant="secondaryNeutral"
          width="100%"
          size="large"
          onClick={handleClick}
        >
          {t(
            "artworkPage.artworkAuctionCreateAlertHeader.suggestedArtworksButton"
          )}
        </Button>
      </Media>

      {modalIsOpened && (
        <SuggestedArtworksModal
          onClose={handleCloseModal}
          criteria={allowedCriteria}
          entity={entity}
          artistSlug={firstArtistSlug}
        />
      )}
    </>
  )
}

export const SuggestedArtworksButtonFragmentContainer = createFragmentContainer(
  SuggestedArtworksButton,
  {
    artwork: graphql`
      fragment SuggestedArtworksButton_artwork on Artwork {
        internalID
        slug
        title
        artists {
          internalID
          slug
          name
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
