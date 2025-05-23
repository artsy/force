import { MyCollectionArtworkDetailField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetailField"
import { buildLocationDisplay } from "Components/LocationAutocompleteInput"
import type { MyCollectionArtworkDetails_artwork$key } from "__generated__/MyCollectionArtworkDetails_artwork.graphql"
import { graphql, useFragment } from "react-relay"

export interface MyCollectionArtworkDetailsProps {
  artwork: MyCollectionArtworkDetails_artwork$key
}

export const MyCollectionArtworkDetails: React.FC<
  React.PropsWithChildren<MyCollectionArtworkDetailsProps>
> = props => {
  const {
    additionalInformation,
    attributionClass,
    mediumType,
    collectorLocation,
    confidentialNotes,
    dimensions,
    editionOf,
    exhibitionHistory,
    medium,
    metric,
    pricePaid,
    provenance,
  } = useFragment(FRAGMENT, props.artwork)

  const rarityText = `${attributionClass?.shortDescription || ""}${
    editionOf ? `\n ${editionOf}` : ""
  }`

  return (
    <>
      <MyCollectionArtworkDetailField label="Medium" value={mediumType?.name} />
      <MyCollectionArtworkDetailField label="Materials" value={medium} />
      <MyCollectionArtworkDetailField label="Rarity" value={rarityText} />
      <MyCollectionArtworkDetailField
        label="Dimensions"
        value={metric === "in" ? dimensions?.in : dimensions?.cm}
      />

      <MyCollectionArtworkDetailField
        label="Location"
        value={buildLocationDisplay(collectorLocation)}
      />
      <MyCollectionArtworkDetailField label="Provenance" value={provenance} />
      <MyCollectionArtworkDetailField
        label="Price Paid"
        value={pricePaid?.display}
      />
      {exhibitionHistory && (
        <MyCollectionArtworkDetailField
          label="Exhibition History"
          value={exhibitionHistory}
        />
      )}
      {additionalInformation && (
        <MyCollectionArtworkDetailField
          label="Additional Information"
          value={additionalInformation}
        />
      )}
      {confidentialNotes ? (
        <MyCollectionArtworkDetailField
          label="Notes"
          value={confidentialNotes}
          truncateLimit={70}
        />
      ) : null}
    </>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkDetails_artwork on Artwork {
    mediumType {
      name
    }
    additionalInformation
    exhibitionHistory
    confidentialNotes
    medium
    metric
    dimensions {
      in
      cm
    }
    provenance
    attributionClass {
      shortDescription
    }
    editionOf
    pricePaid {
      display
    }
    collectorLocation {
      city
      state
      country
      countryCode
    }
  }
`
