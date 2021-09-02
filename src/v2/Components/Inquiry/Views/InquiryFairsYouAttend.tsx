import { Banner, Box, Button, Text } from "@artsy/palette"
import React from "react"
import { graphql } from "relay-runtime"
import { InquiryFairsYouAttendQuery } from "v2/__generated__/InquiryFairsYouAttendQuery.graphql"
import { InquiryAffiliatedAutocomplete } from "../Components/InquiryAffiliatedAutocomplete"
import { InquiryAffiliatedSelectedOptions } from "../Components/InquiryAffiliatedSelectedOptions"
import { useInquiryAffiliated, Mode } from "../Hooks/useInquiryAffiliated"

export const InquiryFairsYouAttend: React.FC = () => {
  const {
    handleRemove,
    handleSelect,
    handleSave,
    selection,
    mode,
  } = useInquiryAffiliated()

  const handleClick = () => {
    const affiliatedFairIds = selection.map(({ value }) => value)
    handleSave({ affiliatedFairIds })
  }

  return (
    <>
      <Text variant="lg" mb={2}>
        What fairs do you attend?{" "}
        <Box color="black60" as="span">
          (Optional)
        </Box>
      </Text>

      {mode === Mode.Error && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <InquiryAffiliatedAutocomplete<InquiryFairsYouAttendQuery>
        query={query}
        onSelect={handleSelect}
        getOptions={props =>
          // TODO: Make this non-nullable
          props.external!.fairs.map(option => ({
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
  query InquiryFairsYouAttendQuery($term: String!) {
    external {
      fairs(size: 5, term: $term) {
        internalID
        name
      }
    }
  }
`
