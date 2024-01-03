import * as React from "react"
import { useCallback, useEffect } from "react"
import styled from "styled-components"
import {
  RadioGroup,
  BorderedRadio,
  Spacer,
  Clickable,
  usePrevious,
} from "@artsy/palette"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavedAddresses2_me$data } from "__generated__/SavedAddresses2_me.graphql"
import { AddressModal } from "Apps/Order/Routes/Shipping2/Components/AddressModal2"
import createLogger from "Utils/logger"
import { SavedAddressItem } from "Apps/Order/Routes/Shipping2/Components/SavedAddressItem2"
import { themeGet } from "@styled-system/theme-get"

import {
  AddressModalAction,
  FulfillmentValues,
  SavedAddressType,
  addressWithFallbackValues,
  getAddressByID,
  getDefaultUserAddress,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { useFormikContext } from "formik"

export const NEW_ADDRESS = "NEW_ADDRESS"

export interface SavedAddressesProps {
  relay: RelayRefetchProp
  me: SavedAddresses2_me$data
  active: boolean
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const logger = createLogger("SavedAddresses.tsx")

  const shippingContext = useShippingContext()
  const orderTracking = useOrderTracking()
  const formikContext = useFormikContext<FulfillmentValues>()

  const addressList = shippingContext.meData.addressList

  const savedToOrderAddressID =
    shippingContext.orderData.savedFulfillmentDetails?.selectedSavedAddressID ??
    undefined

  /* Select an address radio button; set values on formik context
   * and submit form.
   */
  const handleClickAddress = (id: string): void => {
    orderTracking.clickedShippingAddress()
    const address = getAddressByID(addressList, id)
    if (!address) {
      logger.error("Address not found: ", id)
      return
    }
    handleSelectAddress(addressWithFallbackValues(address))
  }

  const serializedValues = JSON.stringify(formikContext.values)
  const handleSelectAddress = useCallback(
    async (address: FulfillmentValues["attributes"]) => {
      await formikContext.setValues({
        ...formikContext.values,
        attributes: addressWithFallbackValues(address),
        meta: {
          ...formikContext.values.meta,
          addressVerifiedBy: null,
        },
      })

      await formikContext.submitForm()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formikContext.setValues, formikContext.submitForm, serializedValues]
  )

  const handleClickEditAddress = async (address: SavedAddressType) => {
    const userAddressAction: AddressModalAction = {
      type: "edit",
      addressID: address.internalID,
    }

    await formikContext.setFieldValue(
      "attributes",
      addressWithFallbackValues(address)
    )
    shippingContext.actions.setAddressModalAction(userAddressAction)
  }

  /* Effects */

  // Automatically select best available address ID if it isn't present
  const selectedAddress =
    savedToOrderAddressID && getAddressByID(addressList, savedToOrderAddressID)

  useEffect(() => {
    if (props.active && !selectedAddress && addressList.length > 0) {
      console.log("Auto-select best address")

      const bestAddress = getBestAvailableAddress(
        addressList,
        savedToOrderAddressID,
        shippingContext.orderData.availableShippingCountries
      )
      if (bestAddress) {
        handleSelectAddress(addressWithFallbackValues(bestAddress))
      }
    }
  }, [
    addressList,
    savedToOrderAddressID,
    shippingContext.orderData.availableShippingCountries,
    handleSelectAddress,
    props.active,
    selectedAddress,
  ])

  // Automatically select the address (saving via onSelect prop)
  // when the selectedAddressID changes (and on load, using the default address)
  const previousSelectedAddressID = usePrevious(savedToOrderAddressID)
  useEffect(() => {
    if (
      savedToOrderAddressID &&
      savedToOrderAddressID !== previousSelectedAddressID
    ) {
      console.log("Auto-save address")
      const selectedAddress = getAddressByID(addressList, savedToOrderAddressID)
      if (!selectedAddress) {
        logger.warn("Address not found, can't submit: ", savedToOrderAddressID)
        return
      }
      handleSelectAddress(addressWithFallbackValues(selectedAddress))
    }
  }, [
    savedToOrderAddressID,
    addressList,
    previousSelectedAddressID,
    logger,
    handleSelectAddress,
  ])

  return (
    <>
      <RadioGroup
        disabled={!props.active}
        onSelect={handleClickAddress}
        defaultValue={savedToOrderAddressID}
      >
        {addressList.map((address, index) => {
          return (
            <BorderedRadio
              value={address.internalID}
              tabIndex={props.active ? 0 : -1}
              // disabled={!availableShippingCountries.includes(address.country)}
              key={index}
              position="relative"
              data-test="savedAddress"
            >
              <SavedAddressItem
                address={address}
                handleClickEdit={() => handleClickEditAddress(address)}
              />
            </BorderedRadio>
          )
        })}
      </RadioGroup>
      {addressList.length > 0 && (
        <AddAddressButton
          mt={2}
          tabIndex={props.active ? 0 : -1}
          data-test="shippingButton"
          onClick={() => {
            orderTracking.clickedAddNewShippingAddress()
            shippingContext.actions.setAddressModalAction({ type: "create" })
          }}
        >
          Add a new address
        </AddAddressButton>
      )}
      <AddressModal
        closeModal={() => {
          shippingContext.actions.setAddressModalAction(null)
        }}
        onSuccess={() => {
          shippingContext.actions.setAddressModalAction(null)
        }}
      />
      <Spacer y={4} />
    </>
  )
}

export const SavedAddressesFragmentContainer = createRefetchContainer(
  SavedAddresses,
  {
    me: graphql`
      fragment SavedAddresses2_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        id
        addressConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) @connection(key: "SavedAddresses_addressConnection") {
          totalCount
          edges {
            node {
              internalID
              addressLine1
              addressLine2
              addressLine3
              city
              country
              isDefault
              name
              phoneNumber
              postalCode
              region
            }
          }
        }
      }
    `,
  },
  graphql`
    query SavedAddresses2RefetchQuery {
      me {
        ...SavedAddresses2_me
      }
    }
  `
)

const AddAddressButton = styled(Clickable)`
  text-decoration: underline;
  &:hover {
    color: ${themeGet("colors.blue100")};
  }
`

const getBestAvailableAddress = (
  addressList: SavedAddressType[],
  addressID?: string | null,
  availableShippingCountries?: string[]
) => {
  return (
    (addressID && getAddressByID(addressList, addressID)) ||
    getDefaultUserAddress(addressList, availableShippingCountries)
  )
}
