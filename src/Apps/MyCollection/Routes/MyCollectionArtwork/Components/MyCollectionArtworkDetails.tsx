import { MyCollectionArtworkDetailFields } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetailFields"
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
    <MyCollectionArtworkDetailFields
      fields={[
        { label: "Medium", value: mediumType?.name },
        { label: "Materials", value: medium },
        { label: "Rarity", value: rarityText },
        {
          label: "Dimensions",
          value: metric === "in" ? dimensions?.in : dimensions?.cm,
        },
        {
          label: "Location",
          value: buildLocationDisplay(collectorLocation),
        },
        { label: "Provenance", value: provenance, truncateLimit: 200 },
        { label: "Price Paid", value: pricePaid?.display },
        ...(exhibitionHistory
          ? [{ label: "Exhibition History", value: exhibitionHistory }]
          : []),
        ...(additionalInformation
          ? [{ label: "Additional Information", value: additionalInformation }]
          : []),
        ...(confidentialNotes
          ? [{ label: "Notes", value: confidentialNotes, truncateLimit: 200 }]
          : []),
      ]}
    />
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
