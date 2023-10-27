import * as React from "react"
import { useCallback, useState } from "react"
import styled from "styled-components"
import { compact } from "lodash"
import { RadioGroup, BorderedRadio, Spacer, Clickable } from "@artsy/palette"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavedAddresses2_me$data } from "__generated__/SavedAddresses2_me.graphql"
import {
  AddressModal,
  AddressModalAction,
  AddressModalActionType,
} from "Apps/Order/Routes/Shipping2/AddressModal2"
import createLogger from "Utils/logger"
import { SavedAddressItem } from "Apps/Order/Routes/Shipping2/SavedAddressItem2"
import { extractNodes } from "Utils/extractNodes"
import { themeGet } from "@styled-system/theme-get"

import { useShippingContext } from "Apps/Order/Routes/Shipping2/ShippingContext"
import {
  SavedAddressType,
  ShippingAddressFormValues,
  addressWithFallbackValues,
  getDefaultUserAddress,
} from "Apps/Order/Routes/Shipping2/shippingUtils"
import { useOrderTracking } from "Apps/Order/Utils/useOrderTracking"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

export interface SavedAddressesProps {
  relay: RelayRefetchProp
  me: SavedAddresses2_me$data
  active: boolean
  onSelect: (address: ShippingAddressFormValues) => void
  orderID: string
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const logger = createLogger("SavedAddresses.tsx")
  const [activeModal, setActiveModal] = useState<AddressModalAction | null>(
    null
  )
  const shippingContext = useShippingContext()

  const { onSelect, me, relay, orderID } = props

  const addressList = compact<SavedAddressType>(
    extractNodes(me?.addressConnection) ?? []
  )

  const [selectedAddressID, setSelectedAddressID] = useState<
    string | undefined
  >(
    getBestAvailableAddress(
      addressList,
      shippingContext.computedOrderData.selectedSavedAddressId ?? undefined,
      shippingContext.computedOrderData.availableShippingCountries
    )?.internalID
  )

  const selectedAddress =
    selectedAddressID && getAddressByID(addressList, selectedAddressID)
  const selectedAddressPresent = !!selectedAddress

  const {
    clickedShippingAddress,
    clickedAddNewShippingAddress,
  } = useOrderTracking(orderID)

  React.useEffect(() => {
    if (!selectedAddressPresent) {
      setSelectedAddressID(
        getBestAvailableAddress(
          addressList,
          shippingContext.computedOrderData.selectedSavedAddressId ?? undefined,
          shippingContext.computedOrderData.availableShippingCountries
        )?.internalID
      )
    }
  }, [
    selectedAddressPresent,
    addressList,
    shippingContext.computedOrderData.selectedSavedAddressId,
    shippingContext.computedOrderData.availableShippingCountries,
  ])

  const handleSelectAddress = useCallback(
    (id: string): void => {
      setSelectedAddressID(id)
      const selectedAddress = getAddressByID(addressList, id)
      if (!selectedAddress) {
        console.warn("Address not found: ", id)
      }
      clickedShippingAddress()
      // Set values on the fulfillment form context.
      // Can these values be invalid? If so, maybe we could pop a form up for
      // them to fix it. Seems unlikely.
      onSelect(addressWithFallbackValues(selectedAddress))
    },
    [addressList, clickedShippingAddress, onSelect]
  )

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

  const onError = (message: string) => {
    logger.error(message)
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
            clickedAddNewShippingAddress()
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
        onDeleteAddress={refetchAddresses}
        onError={onError}
        me={me}
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
  addressID?: string,
  availableShippingCountries?: string[]
) => {
  return (
    (addressID && getAddressByID(addressList, addressID)) ||
    getDefaultUserAddress(addressList, availableShippingCountries)
  )
}
