import { useEffect, useState, FC } from "react"
import styled from "styled-components"
import { RadioGroup, BorderedRadio, Spacer, Clickable } from "@artsy/palette"
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

export interface SavedAddressesProps {
  active: boolean
  onSelect: (address: SavedAddressType) => void
}

export const SavedAddresses2: FC<SavedAddressesProps> = props => {
  const logger = createLogger("SavedAddresses.tsx")

  const shippingContext = useShippingContext()
  const orderTracking = useOrderTracking()
  const formikContext = useFormikContext<FulfillmentValues>()

  const [
    addressModalAction,
    setAddressModalAction,
  ] = useState<AddressModalAction | null>(null)

  const { addressList } = shippingContext.meData

  const savedAddressOnOrder = shippingContext.orderData.savedFulfillmentDetails
    ?.selectedSavedAddressID
    ? getAddressByID(
        addressList,
        shippingContext.orderData.savedFulfillmentDetails
          ?.selectedSavedAddressID
      ) ?? null
    : null

  const selectAndSubmitAddress = (address: SavedAddressType) => {
    shippingContext.actions.setSelectedSavedAddressID(address.internalID)
    props.onSelect(address)
  }

  const addressSavedToOrderID = savedAddressOnOrder?.internalID

  // TODO: Make sure this can't create an infinite loop if submitting fails
  useEffect(() => {
    // Automatically select (save) best available address ID if it isn't present
    const automaticallySelectBestAddress = async () => {
      if (
        props.active &&
        !shippingContext.state.isPerformingOperation &&
        !formikContext.isSubmitting &&
        !shippingContext.state.selectedSavedAddressID &&
        addressList.length > 0
      ) {
        const bestAddress = getBestAvailableAddress(
          addressList,
          addressSavedToOrderID,
          shippingContext.orderData.availableShippingCountries
        )
        if (bestAddress) {
          selectAndSubmitAddress(bestAddress)
        }
      }
    }
    automaticallySelectBestAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.active])

  /*
   * Select an address radio button and pass the address to the parent.
   */
  const handleClickAddress = (id: string): void => {
    orderTracking.clickedShippingAddress()
    const address = getAddressByID(addressList, id)
    if (!address) {
      logger.error("Address not found: ", id)
      return
    }
    selectAndSubmitAddress(address)
  }

  const handleClickEditAddress = async (address: SavedAddressType) => {
    const addressModalAction: AddressModalAction = {
      type: "edit",
      address: address,
    }

    setAddressModalAction(addressModalAction)
  }

  const handleAddressModalSuccess = (address: SavedAddressType) => {
    selectAndSubmitAddress(address)
    setAddressModalAction(null)
  }

  /* Effects */

  return (
    <>
      <RadioGroup
        data-testid="saved-addresses"
        disabled={!props.active}
        onSelect={handleClickAddress}
        defaultValue={shippingContext.state.selectedSavedAddressID ?? undefined}
      >
        {addressList.map((address, index) => {
          return (
            <BorderedRadio
              value={address.internalID}
              selected={
                address.internalID ===
                shippingContext.state.selectedSavedAddressID
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
