import { Banner, Box, Button, Text } from "@artsy/palette"
import React from "react"
import { graphql } from "relay-runtime"
import { InquiryGalleriesYouWorkWithQuery } from "v2/__generated__/InquiryGalleriesYouWorkWithQuery.graphql"
import { InquiryAffiliatedAutocomplete } from "../Components/InquiryAffiliatedAutocomplete"
import { InquiryAffiliatedSelectedOptions } from "../Components/InquiryAffiliatedSelectedOptions"
import { useInquiryAffiliated, Mode } from "../Hooks/useInquiryAffiliated"

export const InquiryGalleriesYouWorkWith: React.FC = () => {
  const {
    handleRemove,
    handleSelect,
    handleSave,
    selection,
    mode,
  } = useInquiryAffiliated()

  const handleClick = () => {
    const affiliatedGalleryIds = selection.map(({ value }) => value)
    handleSave({ affiliatedGalleryIds })
  }

  return (
    <>
      <Text variant="lg" mb={2}>
        What galleries do you work with?{" "}
        <Box color="black60" as="span">
          (Optional)
        </Box>
      </Text>

      {mode === Mode.Error && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <InquiryAffiliatedAutocomplete<InquiryGalleriesYouWorkWithQuery>
        query={query}
        onSelect={handleSelect}
        getOptions={props =>
          // TODO: Make this non-nullable
          props.external!.galleries.map(option => ({
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
  query InquiryGalleriesYouWorkWithQuery($term: String!) {
    external {
      galleries(size: 5, term: $term) {
        internalID
        name
      }
    }
  }
`
