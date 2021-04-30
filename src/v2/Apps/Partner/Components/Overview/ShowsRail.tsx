import React, { useState } from "react"
import { Box, BoxProps, Flex, ResponsiveBox, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowsRail_partner } from "v2/__generated__/ShowsRail_partner.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { flatten } from "lodash"
import { ShowCardFragmentContainer } from "../PartnerShows/ShowCard"
import { Carousel } from "../Carousel"
import { ScrollToPartnerHeader } from "../ScrollToPartnerHeader"

interface ShowsRailProps extends BoxProps {
  partner: ShowsRail_partner
}

const ShowsRail: React.FC<ShowsRailProps> = ({ partner, ...rest }) => {
  const [isSeeAllAvaliable, setIsSeeAllAvaliable] = useState<boolean>(undefined)
  if (
    !partner ||
    !partner.showsConnection ||
    partner.showsConnection.edges.length === 0
  ) {
    return null
  }

  const {
    slug,
    showsConnection: { edges: shows },
  } = partner

  return (
    <Box {...rest}>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Text variant="title">All Events</Text>
        <RouterLink to={`/partner2/${slug}/shows`}>
          <ScrollToPartnerHeader>
            <Text>View all</Text>
          </ScrollToPartnerHeader>
        </RouterLink>
      </Flex>

      <Carousel
        onRailOverflowChange={setIsSeeAllAvaliable}
        itemsPerViewport={[2, 2, 3, 4]}
      >
        {flatten([
          shows.map(edge => {
            return (
              <Box key={edge.node.id} width={[300, "100%"]}>
                <ShowCardFragmentContainer show={edge.node} />
              </Box>
            )
          }),
          isSeeAllAvaliable && (
            <Box key="see-all-button" width={[300, "100%"]}>
              <RouterLink to={`/partner2/${slug}/shows`}>
                <ScrollToPartnerHeader width="100%">
                  <ResponsiveBox
                    aspectWidth={263}
                    aspectHeight={222}
                    maxWidth="100%"
                    bg="black10"
                  >
                    <Flex
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text style={{ textDecoration: "underline" }}>
                        See all shows
                      </Text>
                    </Flex>
                  </ResponsiveBox>
                </ScrollToPartnerHeader>
              </RouterLink>
            </Box>
          ),
        ])}
      </Carousel>
    </Box>
  )
}

export const ShowsRailFragmentContainer = createFragmentContainer(ShowsRail, {
  partner: graphql`
    fragment ShowsRail_partner on Partner {
      slug
      showsConnection(status: ALL, first: 19, isDisplayable: true) {
        edges {
          node {
            id
            ...ShowCard_show
          }
        }
      }
    }
  `,
})
