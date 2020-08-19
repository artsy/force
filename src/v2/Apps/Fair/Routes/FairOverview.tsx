import { Box, CSSGrid, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOverview_fair } from "v2/__generated__/FairOverview_fair.graphql"
import { FairEditorialFragmentContainer as FairEditorial } from "../Components/FairEditorial"
import { FairHeaderFragmentContainer as FairHeader } from "../Components/FairHeader"

interface FairOverviewProps {
  fair: FairOverview_fair
}

const FairOverview: React.FC<FairOverviewProps> = ({ fair }) => {
  return (
    <>
      <FairHeader fair={fair} />

      <CSSGrid
        gridRowGap={3}
        gridColumnGap={3}
        gridTemplateColumns={["repeat(1fr)", "repeat(2, 1fr)"]}
        mt={3}
        pt={3}
        borderTop="1px solid"
        borderColor="black10"
      >
        {fair.articles.edges.length > 0 && (
          <Box>
            <Text variant="subtitle" as="h3" mb={2}>
              Coverage by Artsy Editorial
            </Text>

            <FairEditorial fair={fair} />
          </Box>
        )}

        <Box>
          <Text variant="subtitle" as="h3" mb={2}>
            Curated highlights
          </Text>
        </Box>
      </CSSGrid>
    </>
  )
}

export const FairOverviewFragmentContainer = createFragmentContainer(
  FairOverview,
  {
    fair: graphql`
      fragment FairOverview_fair on Fair {
        ...FairHeader_fair
        ...FairEditorial_fair
        articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
          edges {
            __typename
          }
        }
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairOverviewFragmentContainer
