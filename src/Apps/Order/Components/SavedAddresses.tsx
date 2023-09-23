import { RadioGroup, BorderedRadio, Spacer, Clickable } from "@artsy/palette"
import { useCallback, useEffect, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import {
  AddressModal,
  AddressModalAction,
  AddressModalActionType,
} from "Apps/Order/Components/AddressModal"
import createLogger from "Utils/logger"
import { SavedAddressItem } from "Apps/Order/Components/SavedAddressItem"
import { deleteUserAddress } from "Apps/Order/Mutations/DeleteUserAddress"
import { useSystemContext } from "System/SystemContext"
import { extractNodes } from "Utils/extractNodes"
import { useTracking } from "react-tracking"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { SavedAddressType } from "Components/Address/utils"
import {
  ShippingAddressFormValues,
  addressWithFallbackValues,
  getDefaultUserAddress,
} from "Apps/Order/Utils/shippingUtils"
import { compact } from "lodash"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

export interface SavedAddressesProps {
  relay: RelayRefetchProp
  me: SavedAddresses_me$data
  active: boolean
  onSelect: (address: ShippingAddressFormValues) => void
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
    getDefaultUserAddress(addressList)
  )
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const logger = createLogger("SavedAddresses.tsx")
  const { trackEvent } = useTracking()
  const { relayEnvironment } = useSystemContext()
  const [activeModal, setActiveModal] = useState<AddressModalAction | null>(
    null
  )

  const { onSelect, me, relay } = props

  const addressList = compact<SavedAddressType>(
    extractNodes(me?.addressConnection) ?? []
  )

  const [selectedAddressID, setSelectedAddressID] = useState<
    string | undefined
  >(getDefaultUserAddress(addressList)?.internalID)

  const activeAddress =
    selectedAddressID && getAddressByID(addressList, selectedAddressID)

  // TODO: Review this. Is it needed?
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

  const handleSelectAddress = useCallback(
    (id: string): void => {
      setSelectedAddressID(id)
      const selectedAddress = getAddressByID(addressList, id)
      if (!selectedAddress) {
        console.warn("Address not found: ", id)
      }
      // Set values on the fulfillment form context.
      // Can these values be invalid? If so, maybe we could pop a form up for
      // them to fix it. Seems unlikely.
      onSelect(addressWithFallbackValues(selectedAddress))
    },
    [addressList, onSelect]
  )

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

  const handleClickEditAddress = (address: SavedAddressType) => {
    setSelectedAddressID(address.id)
    setActiveModal({
      type: AddressModalActionType.EDIT_USER_ADDRESS,
      address: address,
    })
  }

  const createOrUpdateAddressSuccess = () => {
    refetchAddresses(() => {})
  }

  const trackAddAddressClick = () => {
    trackEvent({
      action: ActionType.clickedAddNewShippingAddress,
      context_page_owner_type: OwnerType.ordersShipping,
      context_module: ContextModule.ordersShipping,
    })
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
              disabled={!props.active}
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
            trackAddAddressClick()
            setActiveModal({ type: AddressModalActionType.CREATE_USER_ADDRESS })
          }}
        >
          Add a new address
        </AddAddressButton>
      )}
      <AddressModal
        modalAction={(props.active && activeModal) || undefined}
        closeModal={() => setActiveModal(null)}
        onSuccess={createOrUpdateAddressSuccess}
        onDeleteAddress={handleDeleteAddress}
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
