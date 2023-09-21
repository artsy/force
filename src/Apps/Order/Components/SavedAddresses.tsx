import { RadioGroup, BorderedRadio, Spacer, Clickable } from "@artsy/palette"
import { useEffect, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import {
  AddressModal,
  AddressModalAction,
} from "Apps/Order/Components/AddressModal"
import createLogger from "Utils/logger"
import { SavedAddressItem } from "Apps/Order/Components/SavedAddressItem"
import { deleteUserAddress } from "Apps/Order/Mutations/DeleteUserAddress"
import { useSystemContext } from "System/SystemContext"
import { compact } from "lodash"
import { extractNodes } from "Utils/extractNodes"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { useTracking } from "react-tracking"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { SavedAddressType } from "Components/Address/utils"
import { ShippingValues } from "Apps/Order/Routes/Shipping"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

interface SavedAddressesProps {
  relay: RelayRefetchProp
  me: SavedAddresses_me$data
  onSelect: (
    address: Omit<ShippingValues, "fulfillmentType" | "saveAddress">
  ) => void
}

const getDefaultAddress = (addressList: SavedAddressType[]) => {
  const items = compact(addressList)

  if (!items || items.length == 0) {
    return
  }

  return items.find(node => node.isDefault) || items[0]
}

const getAddressByID = (addressList: SavedAddressType[], addressID: string) => {
  return addressList.find(node => node.internalID === addressID)
}

const getBestAvailableAddress = (
  addressList: SavedAddressType[],
  addressID?: string
) => {
  return (
    (addressID && getAddressByID(addressList, addressID)) ||
    getDefaultAddress(addressList)
  )
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const logger = createLogger("SavedAddresses.tsx")
  const { trackEvent } = useTracking()
  const { relayEnvironment } = useSystemContext()
  const [activeModal, setActiveModal] = useState<AddressModalAction | null>(
    null
  )

  const showAddressModal = !!activeModal
  const { onSelect, me, relay } = props

  const addressList = extractNodes(me?.addressConnection) ?? []

  const [selectedAddressID, setSelectedAddressID] = useState<
    string | undefined
  >(getDefaultAddress(addressList)?.internalID)

  const activeAddress =
    selectedAddressID && getAddressByID(addressList, selectedAddressID)

  useEffect(() => {
    if (selectedAddressID && !activeAddress) {
      let bestAvailableAddressID = getBestAvailableAddress(
        addressList,
        selectedAddressID
      )?.internalID
      setSelectedAddressID(bestAvailableAddressID)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressList.length, selectedAddressID])

  useEffect(() => {
    if (!!activeAddress) {
      onSelect(activeAddress)
    }
  }, [activeAddress, onSelect])

  const refetchAddresses = (refetchSuccessCallback?: () => void) => {
    relay.refetch(
      {
        first: PAGE_SIZE,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
        } else {
          refetchSuccessCallback && refetchSuccessCallback()
        }
      }
    )
  }

  const onError = (message: string) => {
    logger.error(message)
  }

  const handleDeleteAddress = async (addressID: string) => {
    return deleteUserAddress(
      relayEnvironment!,
      addressID,
      () => {
        refetchAddresses()
      },
      onError
    )
  }

  const handleEditAddress = (address: SavedAddressType) => {
    setSelectedAddressID(address.id)
    setActiveModal(AddressModalAction.EDIT_USER_ADDRESS)
  }

  const createOrUpdateAddressSuccess = (
    address?: UpdateUserAddressMutation$data & CreateUserAddressMutation$data
  ) => {
    refetchAddresses(() => {})
  }

  const trackAddAddressClick = () => {
    trackEvent({
      action: ActionType.clickedAddNewShippingAddress,
      context_page_owner_type: OwnerType.ordersShipping,
      context_module: ContextModule.ordersShipping,
    })
  }

  const addAddressButton = (
    <>
      {addressList.length > 0 && (
        <AddAddressButton
          mt={2}
          data-test="shippingButton"
          onClick={() => {
            trackAddAddressClick()
            setActiveModal(AddressModalAction.CREATE_USER_ADDRESS)
          }}
        >
          Add a new address
        </AddAddressButton>
      )}
      <AddressModal
        show={showAddressModal}
        modalAction={activeModal || undefined}
        closeModal={() => setActiveModal(null)}
        address={activeAddress || undefined}
        onSuccess={createOrUpdateAddressSuccess}
        onDeleteAddress={handleDeleteAddress}
        onError={onError}
        me={me}
      />
    </>
  )

  const addressItems = compact(addressList).map((address, index) => {
    return (
      <BorderedRadio
        value={address.internalID}
        key={index}
        position="relative"
        data-test="savedAddress"
      >
        <SavedAddressItem
          address={address}
          handleClickEdit={() => handleEditAddress(address)}
        />
      </BorderedRadio>
    )
  })

  return (
    <>
      <RadioGroup
        onSelect={(id: string) => setSelectedAddressID(id)}
        defaultValue={selectedAddressID}
      >
        {addressItems}
      </RadioGroup>
      {addAddressButton}
      <Spacer y={4} />
    </>
  )
}

export const SavedAddressesFragmentContainer = createRefetchContainer(
  SavedAddresses,
  {
    me: graphql`
      fragment SavedAddresses_me on Me
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
              phoneNumberCountryCode
              postalCode
              region
            }
          }
        }
      }
    `,
  },
  graphql`
    query SavedAddressesRefetchQuery {
      me {
        ...SavedAddresses_me
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
