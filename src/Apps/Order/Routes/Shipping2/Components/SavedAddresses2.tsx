import * as React from "react"
import { useState } from "react"
import styled from "styled-components"
import { compact } from "lodash"
import { RadioGroup, BorderedRadio, Spacer, Clickable } from "@artsy/palette"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavedAddresses2_me$data } from "__generated__/SavedAddresses2_me.graphql"
import {
  AddressModal,
  AddressModalAction,
  AddressModalActionType,
} from "Apps/Order/Routes/Shipping2/Components/AddressModal2"
import createLogger from "Utils/logger"
import { SavedAddressItem } from "Apps/Order/Routes/Shipping2/Components/SavedAddressItem2"
import { extractNodes } from "Utils/extractNodes"
import { themeGet } from "@styled-system/theme-get"

import {
  SavedAddressType,
  ShippingAddressFormValues,
  addressWithFallbackValues,
  getDefaultUserAddress,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

export interface SavedAddressesProps {
  relay: RelayRefetchProp
  me: SavedAddresses2_me$data
  active: boolean
  onSelect: (address: ShippingAddressFormValues) => void
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const logger = createLogger("SavedAddresses.tsx")
  const [activeModal, setActiveModal] = useState<AddressModalAction | null>(
    null
  )
  const shippingContext = useShippingContext()

  const { onSelect, me, relay } = props

  const addressList = compact<SavedAddressType>(
    extractNodes(me?.addressConnection) ?? []
  )

  const selectedSavedAddressId =
    shippingContext.orderData.savedFulfillmentDetails?.selectedSavedAddressId
  const [selectedAddressID, setSelectedAddressID] = useState<
    string | undefined
  >(
    getBestAvailableAddress(
      addressList,
      selectedSavedAddressId,
      shippingContext.orderData.availableShippingCountries
    )?.internalID
  )

  const selectedAddress =
    selectedAddressID && getAddressByID(addressList, selectedAddressID)
  const selectedAddressPresent = !!selectedAddress

  const orderTracking = useOrderTracking()

  React.useEffect(() => {
    if (!selectedAddressPresent) {
      setSelectedAddressID(
        getBestAvailableAddress(
          addressList,
          selectedSavedAddressId,
          shippingContext.orderData.availableShippingCountries
        )?.internalID
      )
    }
  }, [
    selectedAddressPresent,
    addressList,
    selectedSavedAddressId,
    shippingContext.orderData.availableShippingCountries,
  ])

  const handleSelectAddress = (id: string): void => {
    setSelectedAddressID(id)
    const selectedAddress = getAddressByID(addressList, id)
    if (!selectedAddress) {
      logger.warn("Address not found: ", id)
    }
    orderTracking.clickedShippingAddress()
    // Set values on the fulfillment form context.
    // Can these values be invalid? If so, maybe we could pop a form up for
    // them to fix it. Seems unlikely.
    onSelect(addressWithFallbackValues(selectedAddress))
  }

  const refetchAddresses = () => {
    return new Promise<void>((resolve, reject) =>
      relay.refetch(
        {
          first: PAGE_SIZE,
        },
        null,
        error => {
          if (error) {
            logger.error(error)
            reject(error)
          } else {
            resolve()
          }
        }
      )
    )
  }

  const handleClickEditAddress = (address: SavedAddressType) => {
    setSelectedAddressID(address.id)
    setActiveModal({
      type: AddressModalActionType.EDIT_USER_ADDRESS,
      address: address,
    })
  }

  const refetchAndSelectAddress = async (addressID: string) => {
    await refetchAddresses()
    setSelectedAddressID(addressID)
  }

  return (
    <>
      <RadioGroup
        disabled={!props.active}
        onSelect={handleSelectAddress}
        defaultValue={selectedAddressID}
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
            setActiveModal({ type: AddressModalActionType.CREATE_USER_ADDRESS })
          }}
        >
          Add a new address
        </AddAddressButton>
      )}
      <AddressModal
        modalAction={(props.active && activeModal) || null}
        closeModal={() => {
          setActiveModal(null)
        }}
        onSuccess={refetchAndSelectAddress}
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
              id
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

const getAddressByID = (addressList: SavedAddressType[], addressID: string) => {
  return addressList.find(node => node.internalID === addressID)
}

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
