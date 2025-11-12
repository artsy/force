import ChevronSmallRightIcon from "@artsy/icons/ChevronSmallRightIcon"
import {
  Box,
  Checkbox,
  Flex,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import type React from "react"
import { useEffect, useState } from "react"

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
  const { questions, addQuestion, removeQuestion } = useInquiryContext()

  // let questionSelected = false
  const [questionSelected, setQuestionSelected] = useState(false)

  const setSelection = () => {
    const newSelection = !questionSelected
    setQuestionSelected(newSelection)
    if (newSelection) {
      console.log("adding question", question)
      addQuestion({ questionID: id, details: question })
    } else {
      console.log("removing question", question)
      removeQuestion({ questionID: id, details: question })
    }
  }
  const shippingLocation = false

  useEffect(() => {
    console.log("questions updated", questions)
  }, [questions])

  return (
    <>
      <Flex flexDirection="row" justifyContent="space-between">
        <Flex flexDirection="row">
          <Join separator={<Spacer x={4} />}>
            <Checkbox selected={questionSelected} onSelect={setSelection} />
            <Text variant="sm">{question}</Text>
          </Join>
        </Flex>
      </Flex>

      {!!isShipping && !!questionSelected && (
        <>
          <Separator my={2} />

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {shippingLocation ? (
              <>
                <Text variant="sm" color="mono60">
                  Add your location
                </Text>
                <Box>
                  <ChevronSmallRightIcon color="mono60" />
                </Box>
              </>
            ) : (
              <>
                <Text variant="sm" color="mono100" style={{ width: "70%" }}>
                  {shippingLocation}
                </Text>
                <Text variant="sm" color="blue100">
                  Edit
                </Text>
              </>
            )}
          </Flex>
        </>
      )}
    </>
  )
}
