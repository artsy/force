import { Flex, StackableBorderBox, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { OfferSummary_offer$data } from "v2/__generated__/OfferSummary_offer.graphql"

interface OfferSummaryProps {
  offer: OfferSummary_offer$data
}

const OfferSummary: React.FC<OfferSummaryProps> = ({ offer }) => {
  return (
    <StackableBorderBox flexDirection="column">
      <Entry label="Partner" value="TODO" />
      <Entry label="Sale Name" value={offer.saleName} />
      <Entry label="Sale Date" value={offer.saleDate} />
      <Entry label="Sale Location" value={offer.saleLocation} />
    </StackableBorderBox>
  )
}

export const OfferSummaryFragmentContainer = createFragmentContainer(
  OfferSummary,
  {
    offer: graphql`
      fragment OfferSummary_offer on ConsignmentOffer {
        saleDate
        saleLocation
        saleName
      }
    `,
  }
)

interface EntryProps {
  label: React.ReactNode
  value: React.ReactNode
}

const Entry: React.FC<EntryProps> = ({ label, value }) => {
  if (!value) {
    return null
  }

  return (
    <Flex
      justifyContent="space-between"
      alignItems="baseline"
      flex="1"
      my={0.5}
    >
      <Text variant="text" color="black60">
        {label}
      </Text>
      <Text variant="text">{value}</Text>
    </Flex>
  )
}
