import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, StackableBorderBox, Text } from "@artsy/palette"

import { Summary_offer$data } from "v2/__generated__/Summary_offer.graphql"

import { SubmissionSummaryFragmentContainer as SubmissionSummary } from "./SubmissionSummary"
import { OfferSummaryFragmentContainer as OfferSummary } from "./OfferSummary"

interface SummaryProps {
  offer: Summary_offer$data
}

const Summary: React.FC<SummaryProps> = ({ offer }) => {
  return (
    <Box>
      <StackableBorderBox>
        <Text variant="subtitle">Review your offer</Text>
      </StackableBorderBox>

      <SubmissionSummary offer={offer} />
      <OfferSummary offer={offer} />
    </Box>
  )
}

export const SummaryFragmentContainer = createFragmentContainer(Summary, {
  offer: graphql`
    fragment Summary_offer on ConsignmentOffer {
      ...SubmissionSummary_offer
      ...OfferSummary_offer
    }
  `,
})
