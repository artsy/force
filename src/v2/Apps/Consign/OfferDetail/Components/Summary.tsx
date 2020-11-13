import { Box, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Summary_offer } from "v2/__generated__/Summary_offer.graphql"

import { SubmissionFragmentContainer as Submission } from "./Submission"

interface SummaryProps {
  offer: Summary_offer
}

const Summary: React.FC<SummaryProps> = ({ offer }) => {
  return (
    <Box>
      <Submission offer={offer} />
      <Text>sale name: {offer.saleName}</Text>
    </Box>
  )
}

export const SummaryFragmentContainer = createFragmentContainer(Summary, {
  offer: graphql`
    fragment Summary_offer on ConsignmentOffer {
      saleDate
      saleName
      saleLocation
      ...Submission_offer
    }
  `,
})
