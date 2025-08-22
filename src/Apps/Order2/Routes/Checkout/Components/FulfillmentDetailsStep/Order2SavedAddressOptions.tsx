import AddIcon from "@artsy/icons/AddIcon"
import {
  BorderedRadio,
  Box,
  Button,
  Clickable,
  Flex,
  Spacer,
  Text,
} from "@artsy/palette"
import { AddAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/AddAddressForm"
import { UpdateAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/UpdateAddressForm"
import {
  type ProcessedUserAddress,
  countryNameFromAlpha2,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2CreateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation"
import { useOrder2UpdateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserAddressMutation"
import { formatPhoneNumber } from "Apps/Order2/Utils/addressUtils"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import { useFormikContext } from "formik"
import { useCallback, useState } from "react"
import styled from "styled-components"

interface SavedAddressOptionsProps {
  savedAddresses: ProcessedUserAddress[]
  initialSelectedAddress?: ProcessedUserAddress
  onSelectAddress: (address: FormikContextWithAddress) => Promise<void>
  newAddressInitialValues: FormikContextWithAddress
}
export const SavedAddressOptions = ({
  savedAddresses,
  initialSelectedAddress,
  onSelectAddress,
  newAddressInitialValues,
}: SavedAddressOptionsProps) => {
  const { setUserAddressMode, userAddressMode } = useCheckoutContext()
  const parentFormikContext = useFormikContext<FormikContextWithAddress>()

  const [selectedAddressID, setSelectedAddressID] = useState(
    initialSelectedAddress?.internalID || "",
  )

  const onSaveAddress = useCallback(
    async (values, addressID) => {
      await onSelectAddress(values)
      setSelectedAddressID(addressID)
      setUserAddressMode(null)
    },
    [onSelectAddress, setUserAddressMode],
  )

  if (userAddressMode?.mode === "add") {
    return (
      <AddAddressForm
        initialValues={newAddressInitialValues}
        onSaveAddress={onSaveAddress}
      />
    )
  }

  if (userAddressMode?.mode === "edit") {
    return (
      <UpdateAddressForm
        address={userAddressMode.address}
        onSaveAddress={onSaveAddress}
      />
    )
  }

  return (
    <Flex flexDirection="column">
      <Text
        fontWeight={["bold", "normal"]}
        color="mono100"
        variant={["sm-display", "md"]}
      >
        Delivery address
      </Text>
      {savedAddresses.map(processedAddress => {
        const { address, isValid, internalID } = processedAddress
        const isSelected = selectedAddressID === internalID
        const backgroundColor = isSelected ? "mono5" : "mono0"
        const textColor = isSelected ? "mono100" : "mono60"

        return (
          <Box key={internalID} position="relative">
            <UnBorderedRadio
              width="100%"
              backgroundColor={backgroundColor}
              value={internalID}
              flex={0}
              disabled={!isValid}
              alignSelf="center"
              selected={isSelected}
              onClick={async () => {
                setSelectedAddressID(internalID)
                await onSelectAddress(processedAddress)
              }}
              label={<Text variant="sm-display">{address.name || ""}</Text>}
            >
              <Flex flexDirection="column" width="100%" ml={0.4}>
                {address.addressLine1 && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {address.addressLine1}
                  </Text>
                )}
                {address.addressLine2 && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {address.addressLine2}
                  </Text>
                )}
                {(address.city || address.region || address.postalCode) && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {[address.city, address.region, address.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </Text>
                )}
                {address.country && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {countryNameFromAlpha2(address.country)}
                  </Text>
                )}

                {address.phoneNumber && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {formatPhoneNumber(address)}
                  </Text>
                )}
              </Flex>
            </UnBorderedRadio>
            <Clickable
              position="absolute"
              top={2}
              right={2}
              onClick={async () => {
                setUserAddressMode({
                  mode: "edit",
                  address: processedAddress,
                })
              }}
            >
              <Text variant="xs" fontWeight="normal" color={textColor}>
                Edit
              </Text>
            </Clickable>
          </Box>
        )
      })}
      <Spacer y={2} />
      <Clickable onClick={() => setUserAddressMode({ mode: "add" })}>
        <Text>
          <AddIcon display="inline-block" top="2px" height="18px" />
          Add new address
        </Text>
      </Clickable>
      <Spacer y={4} />
      <Button
        type="submit"
        loading={parentFormikContext.isSubmitting}
        onClick={() => parentFormikContext.handleSubmit()}
      >
        See Shipping Methods
      </Button>
    </Flex>
  )
}
const UnBorderedRadio = styled(BorderedRadio)`
  border: 0;
`
