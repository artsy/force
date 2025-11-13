import { CellShowFragmentContainer } from "Components/Cells/CellShow"
import { extractNodes } from "Utils/extractNodes"
import { Box, type BoxProps, Flex, Shelf, Text } from "@artsy/palette"
import type { ShowsRail_partner$data } from "__generated__/ShowsRail_partner.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewAllButton } from "./ViewAllButton"

interface ShowsRailProps extends BoxProps {
  partner: ShowsRail_partner$data
}

const ShowsRail: React.FC<React.PropsWithChildren<ShowsRailProps>> = ({
  partner,
  ...rest
}) => {
  if (
    !partner?.showsConnection?.edges ||
    partner.showsConnection.edges.length === 0
  ) {
    return null
  }

  const { slug, showsConnection, displayFullPartnerPage } = partner
  const shows = extractNodes(showsConnection)

  return (
    <Box {...rest}>
      <Flex
        mb={4}
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Text variant="lg-display">All Shows & Fairs</Text>

        {displayFullPartnerPage && (
          <ViewAllButton to={`/partner/${slug}/shows`} />
        )}
      </Flex>

      <Shelf alignItems="flex-start">
        {shows.map(show => (
          <CellShowFragmentContainer
            key={show.internalID}
            show={show}
            displayKind
            displayPartner={false}
          />
        ))}
      </Shelf>
    </Box>
  )
}

export const ShowsRailFragmentContainer = createFragmentContainer(ShowsRail, {
  partner: graphql`
    fragment ShowsRail_partner on Partner {
      slug
      displayFullPartnerPage
      showsConnection(status: ALL, first: 20, isDisplayable: true) {
        totalCount
        edges {
          node {
            ...CellShow_show
            internalID
          }
        }
      }
    }
  `,
})
