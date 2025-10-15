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
import { AddAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/AddAddressForm"
import { UpdateAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/UpdateAddressForm"
import {
  type ProcessedUserAddress,
  countryNameFromAlpha2,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import { setNestedObjectValues, useFormikContext } from "formik"
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

  const onDeleteAddress = useCallback(
    async (deletedAddressID: string) => {
      const remainingAddresses = savedAddresses.filter(
        address => address.internalID !== deletedAddressID,
      )

      if (remainingAddresses.length > 0) {
        const addressToSelect = remainingAddresses.find(
          address => address.isValid,
        )

        if (addressToSelect) {
          setSelectedAddressID(addressToSelect.internalID)
          await onSelectAddress(addressToSelect)
        }
      }
    },
    [savedAddresses, onSelectAddress],
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
        onDeleteAddress={onDeleteAddress}
        defaultInitialValues={newAddressInitialValues}
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
      </Text>{" "}
      <Spacer y={2} />
      {savedAddresses.map(processedAddress => {
        const { address, isValid, internalID, phoneNumberParsed } =
          processedAddress
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

                {phoneNumberParsed?.display && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {phoneNumberParsed.display}
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
        disabled={
          Object.keys(parentFormikContext.errors).length > 0 ||
          !!parentFormikContext.status?.errorBanner
        }
        onClick={async () => {
          const errors = await parentFormikContext.validateForm()
          parentFormikContext.setTouched(setNestedObjectValues(errors, true))

          if (Object.keys(errors).length === 0) {
            parentFormikContext.handleSubmit()
          } else {
            console.log(errors)
            const errorMessages = Object.values(errors).flatMap(v =>
              typeof v === "object" ? Object.values(v) : v,
            )

            parentFormikContext.setStatus({
              errorBanner: {
                title: "Please fix the following errors",
                message: `${errorMessages.join(". ")}.`,
              },
            })
          }
        }}
      >
        See Shipping Methods
      </Button>
    </Flex>
  )
}
const UnBorderedRadio = styled(BorderedRadio)`
  border: 0;
`
