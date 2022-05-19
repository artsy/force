import { Banner, Box, Button, Text } from "@artsy/palette"
import * as React from "react"
import { graphql } from "relay-runtime"
import { InquiryAuctionHousesYouWorkWithQuery } from "v2/__generated__/InquiryAuctionHousesYouWorkWithQuery.graphql"
import { InquiryAffiliatedAutocomplete } from "../Components/InquiryAffiliatedAutocomplete"
import { InquiryAffiliatedSelectedOptions } from "../Components/InquiryAffiliatedSelectedOptions"
import { useInquiryAffiliated, Mode } from "../Hooks/useInquiryAffiliated"
import { useUpdateCollectorProfile } from "../Hooks/useUpdateCollectorProfile"

export const InquiryAuctionHousesYouWorkWith: React.FC = () => {
  const {
    handleRemove,
    handleSelect,
    handleSave,
    selection,
    mode,
  } = useInquiryAffiliated()

  const { submitUpdateCollectorProfile } = useUpdateCollectorProfile()

  const handleClick = () => {
    return handleSave(affiliatedAuctionHouseIds => {
      return submitUpdateCollectorProfile({ affiliatedAuctionHouseIds })
    })
  }

  return (
    <>
      <Text variant="lg-display" mb={2} pr={2}>
        What auction houses do you work with?{" "}
        <Box color="black60" as="span">
          (Optional)
        </Box>
      </Text>

      {mode === Mode.Error && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <InquiryAffiliatedAutocomplete<InquiryAuctionHousesYouWorkWithQuery>
        query={query}
        onSelect={handleSelect}
        getOptions={({ external }) =>
          external.auctionHouses.map(option => ({
            text: option.name,
            value: option.internalID,
          }))
        }
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
  query InquiryAuctionHousesYouWorkWithQuery($term: String!) {
    external {
      auctionHouses(size: 5, term: $term) {
        internalID
        name
      }
    }
  }
`
