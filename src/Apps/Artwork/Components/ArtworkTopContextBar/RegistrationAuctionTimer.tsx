import { Flex, Text } from "@artsy/palette"
import { Timer } from "Components/Timer"
import { createFragmentContainer, graphql } from "react-relay"
import { RegistrationAuctionTimer_sale$data } from "__generated__/RegistrationAuctionTimer_sale.graphql"

interface RegistrationAuctionTimerProps {
  sale: RegistrationAuctionTimer_sale$data
}

const RegistrationAuctionTimer: React.FC<RegistrationAuctionTimerProps> = ({
  sale,
}) => {
  if (!sale.registrationEndsAt || sale.isRegistrationClosed) {
    return null
  }

  return (
    <Flex display={["none", "flex"]} ml={1}>
      <Text variant="xs" color="black60" mr={0.5}>
        Registration for this auction ends:
      </Text>
      <Timer
        endDate={sale.registrationEndsAt}
        minWidth={110}
        textAlign="center"
        variant="xs"
      />
    </Flex>
  )
}

export const RegistrationAuctionTimerFragmentContainer = createFragmentContainer(
  RegistrationAuctionTimer,
  {
    sale: graphql`
      fragment RegistrationAuctionTimer_sale on Sale {
        registrationEndsAt
        isRegistrationClosed
      }
    `,
  }
)
