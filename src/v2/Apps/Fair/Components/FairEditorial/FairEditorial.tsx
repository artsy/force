import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Text } from "@artsy/palette"
import { FairEditorialRailArticlesFragmentContainer as FairEditorialRailArticles } from "./FairEditorialRailArticles"
import { FairEditorial_fair$data } from "v2/__generated__/FairEditorial_fair.graphql"

export const FAIR_EDITORIAL_AMOUNT = 6

interface FairEditorialProps {
  fair: FairEditorial_fair$data
}

export const FairEditorial: React.FC<FairEditorialProps> = ({ fair }) => {
  return (
    <>
      <Text variant="lg" as="h3" mb={4}>
        Explore Further
      </Text>

      <Box>
        <FairEditorialRailArticles fair={fair} />
      </Box>
    </>
  )
}

export const FairEditorialFragmentContainer = createFragmentContainer(
  FairEditorial,
  {
    fair: graphql`
      fragment FairEditorial_fair on Fair {
        ...FairEditorialRailArticles_fair
      }
    `,
  }
)
