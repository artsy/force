import { Box, Expandable, Flex, Text } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import type { Order2OfferHistory_order$key } from "__generated__/Order2OfferHistory_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2OfferHistoryProps {
  order: Order2OfferHistory_order$key
}

// Relative column widths: date · source · offer · incl. shipping & taxes
const COLUMNS = [1.3, 0.8, 1, 1.7]

const sourceLabel = (fromParticipant: string) => {
  return fromParticipant === "SELLER" ? "Gallery" : "You"
}

export const Order2OfferHistory: React.FC<Order2OfferHistoryProps> = ({
  order,
}) => {
  const { submittedOffers } = useFragment(FRAGMENT, order)

  if (!submittedOffers || submittedOffers.length === 0) {
    return null
  }

  return (
    <Box backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Expandable
        label={<SectionHeading>Offer history</SectionHeading>}
        borderColor="transparent"
        backgroundColor="mono0"
      >
        <Flex justifyContent="flex-end" mb={1}>
          <Text variant="xs">Incl. shipping &amp; taxes</Text>
        </Flex>

        {submittedOffers.map(offer => {
          const isSeller = offer.fromParticipant === "SELLER"
          return (
            <Flex
              key={offer.internalID}
              mt={1}
              backgroundColor={isSeller ? "mono0" : "mono5"}
            >
              <Box flex={COLUMNS[0]}>
                <Text variant="sm" justifySelf="flex-start">
                  {offer.createdAt}
                </Text>
              </Box>
              <Box flex={COLUMNS[1]}>
                <Text variant="sm">{sourceLabel(offer.fromParticipant)}</Text>
              </Box>
              <Box flex={COLUMNS[2]}>
                <Text variant="sm" justifySelf="flex-start">
                  {offer.amount?.display}
                </Text>
              </Box>
              <Box flex={COLUMNS[3]}>
                {/* buyerTotal is undefined for incomplete (original) offers */}
                <Text variant="sm" justifySelf="flex-end">
                  {offer.buyerTotal?.display ?? "INCOMPLETE ORDER"}
                </Text>
              </Box>
            </Flex>
          )
        })}
      </Expandable>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment Order2OfferHistory_order on Order {
    submittedOffers {
      internalID
      createdAt(format: "MMMM D, YYYY")
      fromParticipant
      amount {
        display
      }
      buyerTotal {
        display
      }
    }
  }
`
