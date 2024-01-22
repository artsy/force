import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import {
  RadioGroup,
  BorderedRadio,
  Spacer,
  Clickable,
  usePrevious,
} from "@artsy/palette"
import {
  AddressModal,
  AddressModalAction,
} from "Apps/Order/Routes/Shipping2/Components/AddressModal2"
import createLogger from "Utils/logger"
import { SavedAddressItem } from "Apps/Order/Routes/Shipping2/Components/SavedAddressItem2"
import { themeGet } from "@styled-system/theme-get"

import {
  FulfillmentValues,
  SavedAddressType,
  getAddressByID,
  getDefaultUserAddress,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { useFormikContext } from "formik"
import { extractNodes } from "Utils/extractNodes"
import { compact } from "lodash"
import { graphql, useFragment } from "react-relay"
// import { SavedAddresses2_addressConnection$key } from "__generated__/SavedAddresses2_addressConnection.graphql"
import { SavedAddresses2_me$key } from "__generated__/SavedAddresses2_me.graphql"

export interface SavedAddressesProps {
  active: boolean
  me: SavedAddresses2_me$key | null
  onSelect: (address: SavedAddressType) => void
}

export const SavedAddresses2: React.FC<SavedAddressesProps> = props => {
  const logger = createLogger("SavedAddresses.tsx")

  const shippingContext = useShippingContext()
  const orderTracking = useOrderTracking()
  const formikContext = useFormikContext<FulfillmentValues>()

  const [
    addressModalAction,
    setAddressModalAction,
  ] = useState<AddressModalAction | null>(null)

  const data = useFragment(
    graphql`
      fragment SavedAddresses2_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        addressConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
              internalID
              name
              addressLine1
              addressLine2
              city
              region
              postalCode
              country
              phoneNumber
              isDefault
            }
          }
        }
      }
    `,
    props.me
  )

  const addressList = compact<SavedAddressType>(
    extractNodes(data?.addressConnection) ?? []
  )

  const savedToOrderAddress = shippingContext.orderData.savedFulfillmentDetails
    ?.selectedSavedAddressID
    ? getAddressByID(
        addressList,
        shippingContext.orderData.savedFulfillmentDetails
          ?.selectedSavedAddressID
      ) ?? null
    : null
  const previousSavedToOrderAddressID = usePrevious(
    savedToOrderAddress?.internalID
  )

  const [
    locallySelectedAddress,
    setLocallySelectedAddress,
  ] = useState<SavedAddressType | null>(savedToOrderAddress)

  // Automatically update selected address to match what is on order order (without saving)
  const savedToOrderAddressID = savedToOrderAddress?.internalID
  useEffect(() => {
    const updateSelectedAddressAfterSave = () => {
      const savedAddressChanged =
        savedToOrderAddressID &&
        savedToOrderAddressID !== previousSavedToOrderAddressID
      if (
        savedAddressChanged &&
        savedToOrderAddressID !== locallySelectedAddress?.internalID
      ) {
        const address = getAddressByID(addressList, savedToOrderAddressID)
        if (address) {
          setLocallySelectedAddress(address)
        }
      }
    }
    updateSelectedAddressAfterSave()
  }, [
    previousSavedToOrderAddressID,
    addressList,
    setLocallySelectedAddress,
    props.active,
    locallySelectedAddress,
    savedToOrderAddressID,
  ])

  // TODO: What if mutation fails? Locally selected address will be out of sync with order

  useEffect(() => {
    // Automatically select (save) best available address ID if it isn't present
    // TODO: account for errors on save? maybe using formik status or modal dialog
    // Note: Does not account for whether the address is valid for the selected country
    const automaticallySelectBestAddress = async () => {
      if (
        props.active &&
        !shippingContext.state.isPerformingOperation &&
        !formikContext.isSubmitting &&
        !locallySelectedAddress &&
        addressList.length > 0
      ) {
        const bestAddress = getBestAvailableAddress(
          addressList,
          savedToOrderAddressID,
          shippingContext.orderData.availableShippingCountries
        )
        if (bestAddress) {
          setLocallySelectedAddress(bestAddress)
          props.onSelect(bestAddress)
        }
      }
    }
    automaticallySelectBestAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addressList,
    savedToOrderAddressID,
    shippingContext.orderData.availableShippingCountries,
    props.active,
    locallySelectedAddress,
    props.onSelect,
    formikContext.isSubmitting,
    logger,
    shippingContext.state.isPerformingOperation,
  ])

  /* Select an address radio button and pass the address to the parent.
   */
  const handleClickAddress = (id: string): void => {
    orderTracking.clickedShippingAddress()
    const address = getAddressByID(addressList, id)
    if (!address) {
      logger.error("Address not found: ", id)
      return
    }

    props.onSelect(address)
  }

  const handleClickEditAddress = async (address: SavedAddressType) => {
    const addressModalAction: AddressModalAction = {
      type: "edit",
      address: address,
    }

    setAddressModalAction(addressModalAction)
  }

  const handleAddressModalSuccess = (address: SavedAddressType) => {
    // TODO: Check that address is valid?
    props.onSelect(address)
    // set save in process before clearing the modal?
    setAddressModalAction(null)
  }

  /* Effects */

  return (
    <>
      <RadioGroup
        data-testid="saved-addresses"
        disabled={!props.active}
        onSelect={handleClickAddress}
        defaultValue={locallySelectedAddress?.internalID}
      >
        {addressList.map((address, index) => {
          return (
            <BorderedRadio
              value={address.internalID}
              selected={
                address.internalID === locallySelectedAddress?.internalID
              }
              tabIndex={props.active ? 0 : -1}
              key={index}
              position="relative"
              data-testid="savedAddress"
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
          data-testid="shippingButton"
          onClick={() => {
            orderTracking.clickedAddNewShippingAddress()
            setAddressModalAction({ type: "create" })
          }}
        >
          Add a new address
        </AddAddressButton>
      )}
      <AddressModal
        addressModalAction={addressModalAction}
        closeModal={() => {
          setAddressModalAction(null)
        }}
        onSuccess={handleAddressModalSuccess}
      />
      <Spacer y={4} />
    </>
  )
}

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
