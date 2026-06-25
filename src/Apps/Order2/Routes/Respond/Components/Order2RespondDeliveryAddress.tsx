import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Flex, Spacer } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { AddressDisplay } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/AddressDisplay"
import type { Order2RespondDeliveryAddress_order$key } from "__generated__/Order2RespondDeliveryAddress_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2RespondDeliveryAddressProps {
  order: Order2RespondDeliveryAddress_order$key
}

/**
 * Read-only (locked) delivery address summary, matching the collapsed/completed
 * view of the Order2 checkout fulfillment step. The address can only be viewed
 * here — there is no Edit affordance.
 */
export const Order2RespondDeliveryAddress: React.FC<
  Order2RespondDeliveryAddressProps
> = ({ order }) => {
  const { fulfillmentDetails } = useFragment(FRAGMENT, order)

  if (!fulfillmentDetails) {
    return null
  }

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Flex alignItems="center">
        <CheckmarkIcon height={20} width={20} fill="mono100" />
        <Spacer x={0.5} />
        <SectionHeading>Delivery</SectionHeading>
      </Flex>

      <Box ml="30px" mt={1}>
        <AddressDisplay
          address={fulfillmentDetails}
          phoneNumber={fulfillmentDetails.phoneNumber?.display}
          textColor="mono100"
        />
      </Box>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2RespondDeliveryAddress_order on Order {
    fulfillmentDetails {
      name
      addressLine1
      addressLine2
      city
      region
      postalCode
      country
      phoneNumber {
        display(format: INTERNATIONAL)
      }
    }
  }
`
