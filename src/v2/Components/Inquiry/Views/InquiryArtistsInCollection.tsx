import { Banner, Box, Button, Text } from "@artsy/palette"
import * as React from "react"
import { graphql } from "relay-runtime"
import { InquiryAffiliatedAutocomplete } from "../Components/InquiryAffiliatedAutocomplete"
import { InquiryAffiliatedSelectedOptions } from "../Components/InquiryAffiliatedSelectedOptions"
import { Mode, useInquiryAffiliated } from "../Hooks/useInquiryAffiliated"
import { InquiryArtistsInCollectionQuery } from "v2/__generated__/InquiryArtistsInCollectionQuery.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { useCreateUserInterest } from "../Hooks/useCreateUserInterest"

export const InquiryArtistsInCollection: React.FC = () => {
  const {
    mode,
    selection,
    handleRemove,
    handleSelect,
    handleSave,
  } = useInquiryAffiliated()

  const { submitCreateUserInterest } = useCreateUserInterest()

  const handleClick = () => {
    handleSave(artistIds => {
      return Promise.all(
        artistIds.map(artistId => {
          return submitCreateUserInterest({
            category: "COLLECTED_BEFORE",
            interestType: "ARTIST",
            interestId: artistId,
          })
        })
      )
    })
  }

  return (
    <>
      <Text variant="lg-display" mb={2} pr={2}>
        What artists do you collect?{" "}
        <Box color="black60" as="span">
          (Optional)
        </Box>
      </Text>

      {mode === Mode.Error && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <InquiryAffiliatedAutocomplete<InquiryArtistsInCollectionQuery>
        query={query}
        onSelect={handleSelect}
        getOptions={({ searchConnection }) => {
          return extractNodes(searchConnection)
        }}
      />

      <InquiryAffiliatedSelectedOptions
        selection={selection}
        onRemove={handleRemove}
      />

      <Button
        type="submit"
        width="100%"
        loading={mode === Mode.Loading}
        disabled={mode === Mode.Success}
        onClick={handleClick}
      >
        Next
      </Button>
    </>
  )
}

const query = graphql`
  query InquiryArtistsInCollectionQuery($term: String!) {
    searchConnection(query: $term, entities: ARTIST, first: 5) {
      edges {
        node {
          text: displayLabel
          ... on Artist {
            value: internalID
          }
        }
      }
    }
  }
`
