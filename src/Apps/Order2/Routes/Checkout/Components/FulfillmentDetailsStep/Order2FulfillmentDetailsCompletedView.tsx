import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { Order2EditButton } from "Apps/Order2/Components/Order2EditButton"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { AddressDisplay } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/AddressDisplay"

export interface FulfillmentDetails {
  name?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  region?: string | null
  postalCode?: string | null
  country?: string | null
  phoneNumber?: string | null
}

export interface Order2FulfillmentDetailsCompletedViewProps {
  isPickup: boolean
  fulfillmentDetails: FulfillmentDetails
  isOffer?: boolean
  // When provided, an Edit affordance is shown that invokes this callback.
  // Omit it for a locked, view-only rendering.
  onEdit?: () => void
}

export const Order2FulfillmentDetailsCompletedView: React.FC<
  Order2FulfillmentDetailsCompletedViewProps
> = ({ isPickup, fulfillmentDetails, isOffer = false, onEdit }) => {
  if (isPickup) {
    return (
      <Flex flexDirection="column" backgroundColor="mono0">
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <CheckmarkIcon fill="mono100" />
            <Spacer x={1} />
            <SectionHeading>Pickup</SectionHeading>
          </Flex>
          {onEdit && (
            <Order2EditButton
              aria-label="Edit pickup details"
              onClick={onEdit}
            />
          )}
        </Flex>
        <Flex alignItems="center" ml="30px" mt={1}>
          <Text variant="sm" fontWeight="normal" color="mono100">
            {isOffer
              ? "If your offer is accepted,"
              : "After your order is confirmed,"}{" "}
            a specialist will contact you with details on how to pick up the
            work.
          </Text>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon height={20} width={20} fill="mono100" />
          <Box flexGrow={1} mx={0.5} />
          <SectionHeading>Delivery</SectionHeading>
        </Flex>
        {onEdit && (
          <Order2EditButton
            aria-label="Edit delivery address"
            onClick={onEdit}
          />
        )}
      </Flex>

      <Box ml="30px" mt={1}>
        <ShippingContent fulfillmentDetails={fulfillmentDetails} />
      </Box>
    </Flex>
  )
}

const ShippingContent: React.FC<{ fulfillmentDetails: FulfillmentDetails }> = ({
  fulfillmentDetails,
}) => {
  return (
    <AddressDisplay
      address={fulfillmentDetails}
      phoneNumber={fulfillmentDetails.phoneNumber}
      textColor="mono100"
    />
  )
}
