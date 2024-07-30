import { MyCollectionArtworkDetails_artwork$key } from "__generated__/MyCollectionArtworkDetails_artwork.graphql"
import { MyCollectionArtworkDetailField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetailField"
import { buildLocationDisplay } from "Components/LocationAutocompleteInput"
import { graphql, useFragment } from "react-relay"

export interface MyCollectionArtworkDetailsProps {
  artwork: MyCollectionArtworkDetails_artwork$key
}

export const MyCollectionArtworkDetails: React.FC<MyCollectionArtworkDetailsProps> = props => {
  const {
    attributionClass,
    mediumType,
    collectorLocation,
    confidentialNotes,
    dimensions,
    editionOf,
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
