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
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import type { Order2CheckoutContext_order$data } from "__generated__/Order2CheckoutContext_order.graphql"
import type { CheckoutErrorBannerMessage } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { AddressDisplay } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/AddressDisplay"
import { AddAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/AddAddressForm"
import { UpdateAddressForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/UpdateAddressForm"
import { RadioOptionRow } from "Apps/Order2/Routes/Checkout/Components/RadioOptionRow"
import {
  type ProcessedUserAddress,
  validateAddressFields,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToStep } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import { useFormikContext } from "formik"
import { useCallback, useEffect, useState } from "react"

const ADDRESS_ERROR_MESSAGES = {
  unableToShipToAddress: {
    title: "Unable to ship to this address",
    message: "Select a different address or add a new one to continue.",
  },
  missingAddressInfo: {
    title: "Missing required information",
    message: "Edit your address and/or phone number to continue.",
  },
} satisfies Record<string, CheckoutErrorBannerMessage>

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
    setSectionErrorMessage,
    checkoutTracking,
    steps,
    orderData,
  } = useCheckoutContext()
  const { scrollToStep } = useScrollToStep()
  const parentFormikContext = useFormikContext<FormikContextWithAddress>()

  const [selectedAddress, setSelectedAddress] = useState<
    ProcessedUserAddress | undefined
  >(initialSelectedAddress)

  const previousUserAddressMode = usePrevious(userAddressMode)
  const isOfferOrder =
    (orderData as Order2CheckoutContext_order$data)?.mode === "OFFER"

  const fulfillmentDetailsStep = steps?.find(
    step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
  )

  // Track when saved addresses are viewed (only once when step is active)
  useEffect(() => {
    if (
      !checkoutTracking ||
      fulfillmentDetailsStep?.state !== CheckoutStepState.ACTIVE ||
      !!userAddressMode
    ) {
      return
    }

    if (savedAddresses.length > 0) {
      const addressIds = savedAddresses.map(address => address.internalID)
      checkoutTracking.savedAddressViewed(addressIds)
    }
  }, [
    savedAddresses,
    checkoutTracking,
    fulfillmentDetailsStep?.state,
    userAddressMode,
  ])

  // Scroll to top of step whenever userAddressMode changes
  // This covers: beginning edit, completing edit, canceling edit,
  // beginning add, completing add, canceling add, deleting address
  useEffect(() => {
    if (previousUserAddressMode !== userAddressMode) {
      scrollToStep(CheckoutStepName.FULFILLMENT_DETAILS)
    }
  }, [userAddressMode, previousUserAddressMode, scrollToStep])

  // Auto-open edit form for the single saved address if it has missing fields
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount
  useEffect(() => {
    if (savedAddresses.length !== 1 || !initialSelectedAddress) return
    if (!initialSelectedAddress.isValid) {
      setSectionErrorMessage({
        section: CheckoutStepName.FULFILLMENT_DETAILS,
        error: ADDRESS_ERROR_MESSAGES.missingAddressInfo,
      })
      setUserAddressMode({ mode: "edit", address: initialSelectedAddress })
    }
  }, [])

  // Reactively set/clear error banner based on selected address validity and shippability
  useEffect(() => {
    if (!selectedAddress || userAddressMode) return

    if (!selectedAddress.isShippable && !isOfferOrder) {
      setSectionErrorMessage({
        section: CheckoutStepName.FULFILLMENT_DETAILS,
        error: ADDRESS_ERROR_MESSAGES.unableToShipToAddress,
      })
      return
    }

    if (!selectedAddress.isValid) {
      setSectionErrorMessage({
        section: CheckoutStepName.FULFILLMENT_DETAILS,
        error: ADDRESS_ERROR_MESSAGES.missingAddressInfo,
      })
      return
    }

    setSectionErrorMessage({
      section: CheckoutStepName.FULFILLMENT_DETAILS,
      error: null,
    })
  }, [selectedAddress, userAddressMode, isOfferOrder, setSectionErrorMessage])

  const onSaveAddress = useCallback(
    async (values: FormikContextWithAddress, addressID: string) => {
      await onSelectAddress(values)
      setUserAddressMode(null)

      const isValid = validateAddressFields(values)
      const isShippable = availableShippingCountries.includes(
        values.address.country,
      )
      const isDefault =
        savedAddresses.find(a => a.internalID === addressID)?.isDefault ?? false

      setSelectedAddress({
        internalID: addressID,
        ...values,
        isValid,
        isShippable,
        isDefault,
      })
    },
    [
      onSelectAddress,
      setUserAddressMode,
      availableShippingCountries,
      savedAddresses,
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
      checkoutTracking.clickedShippingAddress()
      setSelectedAddress(processedAddress)
      await onSelectAddress(processedAddress)
    },
    [checkoutTracking, onSelectAddress],
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
      <SectionHeading>Delivery address</SectionHeading>

      <Spacer y={2} />

      {savedAddresses.map(processedAddress => {
        const { address, internalID, phoneNumberParsed } = processedAddress
        const isSelected = selectedAddress?.internalID === internalID
        const textColor = isSelected ? "mono100" : "mono60"

        return (
          <RadioOptionRow
            key={internalID}
            isSelected={isSelected}
            onClick={() => handleAddressClick(processedAddress)}
          >
            <Radio
              flex={1}
              value={internalID}
              selected={isSelected}
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
              onClick={e => {
                e.stopPropagation()
                setUserAddressMode({
                  mode: "edit",
                  address: processedAddress,
                })
              }}
            >
              <Text
                style={{ textDecoration: "underline" }}
                variant="sm"
                fontWeight="normal"
                color={textColor}
              >
                Edit
              </Text>
            </Clickable>
          </RadioOptionRow>
        )
      })}

      <Spacer y={2} />

      <Clickable
        onClick={() => {
          checkoutTracking.clickedAddNewShippingAddress()
          setSectionErrorMessage({
            section: CheckoutStepName.FULFILLMENT_DETAILS,
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
        disabled={
          (!selectedAddress?.isShippable && !isOfferOrder) ||
          !selectedAddress?.isValid
        }
        onClick={() => {
          parentFormikContext.handleSubmit()
        }}
      >
        See Shipping Methods
      </Button>
    </Flex>
  )
}
