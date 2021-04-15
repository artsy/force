import React from "react"
import { Flex, Text } from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { BuyerGuaranteeIndex_buyerGuarantee } from "v2/__generated__/BuyerGuaranteeIndex_buyerGuarantee.graphql"
import { useSystemContext } from "v2/Artsy"

interface BuyerGuaranteeIndexProps {
  buyerGuarantee: BuyerGuaranteeIndex_buyerGuarantee
}

export const BuyerGuaranteeIndex: React.FC<BuyerGuaranteeIndexProps> = ({
  buyerGuarantee,
}) => {
  const { user } = useSystemContext()
  const isAdmin = Boolean(user?.roles?.includes("admin"))
  if (!isAdmin) {
    return null
  }

  const sampleText = `Welcome to the Buyer's Guarantee Page ${buyerGuarantee.name}!`

  return (
    <Flex justifyContent="center">
      <Text as="h1" variant="largeTitle">
        {sampleText}
      </Text>
    </Flex>
  )
}

export const BuyerGuaranteeIndexFragmentContainer = createFragmentContainer(
  BuyerGuaranteeIndex,
  {
    buyerGuarantee: graphql`
      fragment BuyerGuaranteeIndex_buyerGuarantee on Me {
        name
      }
    `,
  }
)
