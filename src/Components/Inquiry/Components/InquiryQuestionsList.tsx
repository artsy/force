import { Flex, Spacer, Text } from "@artsy/palette"
import { InquiryQuestionOption } from "Components/Inquiry/Components/InquiryQuestionOption"
import type { InquiryInquiry_artwork$data } from "__generated__/InquiryInquiry_artwork.graphql"
import type * as React from "react"

interface InquiryQuestionsListProps {
  inquiryQuestions: InquiryInquiry_artwork$data["inquiryQuestions"]
}

export const InquiryQuestionsList: React.FC<InquiryQuestionsListProps> = ({
  inquiryQuestions,
}) => {
  if (!inquiryQuestions || inquiryQuestions.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="sm">What information are you looking for?</Text>
      <Spacer y={1} />
      <Flex flexDirection="column" gap={1} px={2}>
        {inquiryQuestions.map(question => {
          if (!question) return null

          return (
            <InquiryQuestionOption
              key={question.internalID}
              id={question.internalID}
              question={question.question}
            />
          )
        })}
      </Flex>
      <Spacer y={2} />
    </>
  )
}
