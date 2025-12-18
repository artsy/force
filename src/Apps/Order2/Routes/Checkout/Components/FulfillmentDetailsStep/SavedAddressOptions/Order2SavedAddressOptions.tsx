import AddIcon from "@artsy/icons/AddIcon"
import { Button, Clickable, Flex, Radio, Spacer, Text } from "@artsy/palette"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { AddAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/AddAddressForm"
import { UpdateAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/UpdateAddressForm"
import {
  type ProcessedUserAddress,
  countryNameFromAlpha2,
  validateAddressFields,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import { useFormikContext } from "formik"
import { useCallback, useState } from "react"

interface SavedAddressOptionsProps {
  savedAddresses: ProcessedUserAddress[]
  initialSelectedAddress?: ProcessedUserAddress
  onSelectAddress: (address: FormikContextWithAddress) => Promise<void>
  newAddressInitialValues: FormikContextWithAddress
  availableShippingCountries?: readonly string[]
}
export const SavedAddressOptions = ({
  savedAddresses,
  initialSelectedAddress,
  onSelectAddress,
  newAddressInitialValues,
  availableShippingCountries = [],
}: SavedAddressOptionsProps) => {
  const {
    setUserAddressMode,
    userAddressMode,
    setStepErrorMessage,
    checkoutTracking,
  } = useCheckoutContext()
  const parentFormikContext = useFormikContext<FormikContextWithAddress>()

  const [selectedAddress, setSelectedAddress] = useState<
    ProcessedUserAddress | undefined
  >(initialSelectedAddress)

  const onSaveAddress = useCallback(
    async (values, addressID) => {
      await onSelectAddress(values)
      setUserAddressMode(null)

      const address = savedAddresses.find(a => a.internalID === addressID)

      if (!address) return

      const isValid = validateAddressFields(values)
      const isShippable = availableShippingCountries.includes(
        values.address.country,
      )

      setSelectedAddress({
        ...address,
        ...values,
        isValid,
        isShippable,
      })

      if (!isShippable) {
        return setStepErrorMessage({
          step: CheckoutStepName.FULFILLMENT_DETAILS,
          error: {
            title: "Unable to ship to this address",
            message:
              "Select a different address or add a new one to continue.",
          },
        })
      }

      if (!isValid) {
        return setStepErrorMessage({
          step: CheckoutStepName.FULFILLMENT_DETAILS,
          error: {
            title: "Invalid address",
            message:
              "This address is missing required information. Edit your address to continue.",
          },
        })
      }

      setStepErrorMessage({
        step: CheckoutStepName.FULFILLMENT_DETAILS,
        error: null,
      })
    },
    [
      onSelectAddress,
      setUserAddressMode,
      savedAddresses,
      setStepErrorMessage,
      availableShippingCountries,
    ],
  )

  const onDeleteAddress = useCallback(
    async (deletedAddressID: string) => {
      const remainingAddresses = savedAddresses.filter(
        address => address.internalID !== deletedAddressID,
      )

      if (remainingAddresses.length > 0) {
        const addressToSelect = remainingAddresses.find(
          address => address.isShippable && address.isValid,
        )

        if (addressToSelect) {
          setSelectedAddress(addressToSelect)
          await onSelectAddress(addressToSelect)
        }
      }
    },
    [savedAddresses, onSelectAddress],
  )

  const handleAddressClick = useCallback(
    async (processedAddress: ProcessedUserAddress) => {
      const { isShippable, isValid } = processedAddress

      checkoutTracking.clickedShippingAddress()
      setSelectedAddress(processedAddress)
      await onSelectAddress(processedAddress)

      if (!isShippable) {
        return setStepErrorMessage({
          step: CheckoutStepName.FULFILLMENT_DETAILS,
          error: {
            title: "Unable to ship to this address",
            message: "Select a different address or add a new one to continue.",
          },
        })
      }

      if (!isValid) {
        return setStepErrorMessage({
          step: CheckoutStepName.FULFILLMENT_DETAILS,
          error: {
            title: "Invalid address",
            message:
              "This address is missing required information. Edit your address to continue.",
          },
        })
      }

      setStepErrorMessage({
        step: CheckoutStepName.FULFILLMENT_DETAILS,
        error: null,
      })
    },
    [checkoutTracking, onSelectAddress, setStepErrorMessage],
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
        fontWeight={["bold", "bold", "normal"]}
        color="mono100"
        variant={["sm-display", "sm-display", "md"]}
      >
        Delivery address
      </Text>

      <Spacer y={2} />

      {savedAddresses.map(processedAddress => {
        const { address, internalID, phoneNumberParsed } = processedAddress
        const isSelected = selectedAddress?.internalID === internalID
        const backgroundColor = isSelected ? "mono5" : "mono0"
        const textColor = isSelected ? "mono100" : "mono60"

        return (
          <Flex key={internalID} backgroundColor={backgroundColor} p={2}>
            <Radio
              flex={1}
              value={internalID}
              selected={isSelected}
              onClick={() => handleAddressClick(processedAddress)}
              label={<Text variant="sm-display">{address.name || ""}</Text>}
            >
              <Flex flexDirection="column">
                {address.addressLine1 && (
                  <Text variant="sm" fontWeight="normal" color={textColor}>
                    {address.addressLine1}
                  </Text>
                )}
                {address.addressLine2 && (
                  <Text variant="sm" fontWeight="normal" color={textColor}>
                    {address.addressLine2}
                  </Text>
                )}
                {(address.city || address.region || address.postalCode) && (
                  <Text variant="sm" fontWeight="normal" color={textColor}>
                    {[address.city, address.region, address.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </Text>
                )}
                {address.country && (
                  <Text variant="sm" fontWeight="normal" color={textColor}>
                    {countryNameFromAlpha2(address.country)}
                  </Text>
                )}

                {phoneNumberParsed?.display && (
                  <Text variant="sm" fontWeight="normal" color={textColor}>
                    {phoneNumberParsed.display}
                  </Text>
                )}
              </Flex>
            </Radio>

            <Clickable
              alignSelf="flex-start"
              onClick={async () => {
                setUserAddressMode({
                  mode: "edit",
                  address: processedAddress,
                })
              }}
            >
              <Text variant="sm" fontWeight="normal" color={textColor}>
                Edit
              </Text>
            </Clickable>
          </Flex>
        )
      })}

      <Spacer y={2} />

      <Clickable
        onClick={() => {
          checkoutTracking.clickedAddNewShippingAddress()
          setUserAddressMode({ mode: "add" })
        }}
      >
        <Text>
          <AddIcon display="inline-block" top="2px" height="18px" />
          Add new address
        </Text>
      </Clickable>

      <Spacer y={4} />

      <Button
        type="submit"
        loading={parentFormikContext.isSubmitting}
        disabled={!selectedAddress?.isShippable || !selectedAddress?.isValid}
        onClick={() => {
          parentFormikContext.handleSubmit()
        }}
      >
        See Shipping Methods
      </Button>
    </Flex>
  )
}
