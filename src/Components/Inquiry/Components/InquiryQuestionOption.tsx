import { Box, Checkbox, Flex, Join, Spacer, Text } from "@artsy/palette"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import {
  LocationAutocompleteInput,
  normalizePlace,
} from "Components/LocationAutocompleteInput"
import type React from "react"
import { useState } from "react"

interface InquiryQuestionOptionProps {
  id: string
  question: string
}

export enum InquiryQuestionIDs {
  Shipping = "shipping_quote",
  PriceAndAvailability = "price_and_availability",
  ConditionAndProvance = "condition_and_provenance",
  SimilarWork = "similar_work",
  ArtistInformation = "artist_information",
  ArtworkInformation = "artwork_information",
}

export const InquiryQuestionOption: React.FC<InquiryQuestionOptionProps> = ({
  id,
  question,
}) => {
  const isShipping = id === InquiryQuestionIDs.Shipping
  const { addQuestion, removeQuestion, addQuestionDetails } =
    useInquiryContext()

  const [questionSelected, setQuestionSelected] = useState(false)

  const setSelection = () => {
    const newSelection = !questionSelected
    setQuestionSelected(newSelection)
    if (newSelection) {
      addQuestion({ questionID: id, details: question })
    } else {
      removeQuestion({ questionID: id, details: question })
    }
  }

  const setShippingDetails = location => {
    const shippingDetails = {
      city: location.city,
      coordinates: location.coordinates,
      country: location.country,
      postal_code: location.postalCode,
      state: location.state,
      state_code: location.stateCode,
    }
    addQuestionDetails({
      questionID: InquiryQuestionIDs.Shipping,
      details: JSON.stringify(shippingDetails),
    })
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row" alignItems="flex-start">
        <Join separator={<Spacer x={1} />}>
          <Box pl={2}>
            <Checkbox selected={questionSelected} onSelect={setSelection} />
          </Box>
          <Text variant="sm">{question}</Text>
        </Join>
      </Flex>

      {isShipping && (
        <Box
          pl={6}
          data-testid="location-container"
          style={{
            maxHeight: questionSelected ? "200px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease, opacity 0.3s ease",
            opacity: questionSelected ? 1 : 0,
          }}
        >
          <Spacer y={1} />
          <LocationAutocompleteInput
            name="location"
            placeholder="Add your location"
            maxLength={256}
            spellCheck={false}
            onChange={place => {
              setShippingDetails(normalizePlace(place))
            }}
          />
          <Spacer y={1} />
        </Box>
      )}
    </Flex>
  )
}
