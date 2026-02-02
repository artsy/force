import AddIcon from "@artsy/icons/AddIcon"
import {
  Button,
  Clickable,
  Flex,
  Radio,
  Spacer,
  Text,
  usePrevious,
} from "@artsy/palette"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { AddressDisplay } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/AddressDisplay"
import { AddAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/AddAddressForm"
import { UpdateAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/UpdateAddressForm"
import {
  type ProcessedUserAddress,
  validateAddressFields,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToStep } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import { useFormikContext } from "formik"
import { useCallback, useEffect, useState } from "react"

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
  const { scrollToStep } = useScrollToStep()
  const parentFormikContext = useFormikContext<FormikContextWithAddress>()

  const [selectedAddress, setSelectedAddress] = useState<
    ProcessedUserAddress | undefined
  >(initialSelectedAddress)

  const previousUserAddressMode = usePrevious(userAddressMode)

  // Scroll to top of step whenever userAddressMode changes
  // This covers: beginning edit, completing edit, canceling edit,
  // beginning add, completing add, canceling add, deleting address
  useEffect(() => {
    if (previousUserAddressMode !== userAddressMode) {
      scrollToStep(CheckoutStepName.FULFILLMENT_DETAILS)
    }
  }, [userAddressMode, previousUserAddressMode, scrollToStep])

  const onSaveAddress = useCallback(
    async (values, addressID) => {
      await onSelectAddress(values)
      setUserAddressMode(null)

      const isValid = validateAddressFields(values)
      const isShippable = availableShippingCountries.includes(
        values.address.country,
      )

      setSelectedAddress({
        internalID: addressID,
        ...values,
        isValid,
        isShippable,
      })

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
            title: "Missing required information",
            message: "Edit your address and/or phone number to continue.",
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
            title: "Missing required information",
            message: "Edit your address and/or phone number to continue.",
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

      <Spacer y={1} />

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
              label={
                <AddressDisplay
                  address={address}
                  phoneNumber={phoneNumberParsed?.display}
                  textColor={textColor}
                />
              }
            />

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
          setStepErrorMessage({
            step: CheckoutStepName.FULFILLMENT_DETAILS,
            error: null,
          })
          setUserAddressMode({ mode: "add" })
        }}
      >
        <Flex alignItems="center">
          <AddIcon height="25px" width="25px" mr={0.5} />
          <Text variant="sm" fontWeight="normal">
            Add new address
          </Text>
        </Flex>
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
