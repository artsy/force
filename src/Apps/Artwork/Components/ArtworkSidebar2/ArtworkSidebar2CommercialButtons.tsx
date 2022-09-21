import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2EditionSetFragmentContainer } from "./ArtworkSidebar2EditionSets"
import { Separator, Spacer, Text } from "@artsy/palette"
import { useCallback, useEffect, useState } from "react"

interface SaleMessageProps {
  saleMessage: string
}

const SaleMessage: React.FC<SaleMessageProps> = ({ saleMessage }) => {
  return (
    <Text variant="lg-display" color="black100">
      {saleMessage}
    </Text>
  )
}

const ArtworkSidebar2CommerialButtons = ({ artwork }) => {
  const firstAvailableEcommerceEditionSet = useCallback(() => {
    const { editionSets } = artwork

    return editionSets.find(
      editionSet => editionSet.isAcquireable || editionSet.isOfferable
    )
  }, [artwork])

  const [selectedEditionSet, setSelectedEditionSet] = useState(
    firstAvailableEcommerceEditionSet()
  )

  useEffect(() => {
    setSelectedEditionSet(firstAvailableEcommerceEditionSet())
  }, [artwork.editionSets, firstAvailableEcommerceEditionSet])

  const artworkEcommerceAvailable = !!(
    artwork.isAcquireable || artwork.isOfferable
  )
  const shouldRenderButtons =
    artworkEcommerceAvailable || !!artwork.isInquireable

  return (
    <>
      {(artwork.editionSets.length ?? 0) < 2 ? (
        artwork.saleMessage && <SaleMessage saleMessage={artwork.saleMessage} />
      ) : (
        <>
          <ArtworkSidebar2EditionSetFragmentContainer
            artwork={artwork}
            selectedEditionSet={selectedEditionSet}
            onSelectEditionSet={setSelectedEditionSet}
          />

          {!!selectedEditionSet && (
            <>
              <Separator />
              <Spacer mt={4} />
              <SaleMessage saleMessage={selectedEditionSet.saleMessage} />
            </>
          )}
        </>
      )}

      {shouldRenderButtons && (
        <>
          <Spacer mt={2} />
        </>
      )}
    </>
  )
}

export const ArtworkSidebar2CommercialButtonsFragmentContainer = createFragmentContainer(
  ArtworkSidebar2CommerialButtons,
  {
    artwork: graphql`
      fragment ArtworkSidebar2CommercialButtons_artwork on Artwork {
        ...ArtworkSidebar2EditionSets_artwork
        saleMessage
        isInquireable
        isAcquireable
        isOfferable
        isSold
        editionSets {
          id
          isAcquireable
          isOfferable
          saleMessage
        }
      }
    `,
  }
)
