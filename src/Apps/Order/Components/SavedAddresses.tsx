import { Button, RadioGroup, BorderedRadio, Spacer } from "@artsy/palette"
import { useEffect, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { AddressModal, ModalDetails } from "Apps/Order/Components/AddressModal"
import { CommitMutation } from "Apps/Order/Utils/commitMutation"
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

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

interface SavedAddressesProps {
  onChangeAddressCount?: (active?: number) => void
  me: SavedAddresses_me$data
  onSelect?: (string) => void
  commitMutation?: CommitMutation
  relay: RelayRefetchProp
  addressCount?: number
  onAddressDelete?: (removedAddressId: string) => void
  onAddressCreate?: (
    address: CreateUserAddressMutation$data["createUserAddress"]
  ) => void
  onAddressEdit?: (
    address: UpdateUserAddressMutation$data["updateUserAddress"]
  ) => void
  selectedAddress?: string
  onShowToast?: (isShow: boolean, action: string) => void
}

type Address = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<SavedAddresses_me$data["addressConnection"]>["edges"]
    >[0]
  >["node"]
>

const defaultAddressIndex = (addressList: Address[]) => {
  const items = compact(addressList)

  if (!items || items.length == 0) {
    return
  }

  const defaultAddressID = items.find(node => node.isDefault)?.internalID

  return defaultAddressID || items[0].internalID
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const { trackEvent } = useTracking()
  const [modalDetails, setModalDetails] = useState<ModalDetails | undefined>()
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [address, setAddress] = useState<Address | undefined | null>(null)
  const logger = createLogger("SavedAddresses.tsx")
  const {
    onSelect,
    onChangeAddressCount,
    me,
    relay,
    onAddressDelete,
    onAddressCreate,
    selectedAddress,
    onShowToast,
    onAddressEdit,
  } = props

  useEffect(() => {
    onChangeAddressCount &&
      onChangeAddressCount(me.addressConnection?.totalCount)
    // FIXME: Remove this disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.addressConnection?.totalCount])

  const addressList = extractNodes(me?.addressConnection) ?? []

  const { relayEnvironment } = useSystemContext()

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
    let response = await deleteUserAddress(
      relayEnvironment!,
      addressID,
      () => {
        refetchAddresses(() => {
          // Execute address delete callback after address deleted
          // and list of addresses updated
          onAddressDelete && onAddressDelete(addressID)
        })
      },
      onError
    )
    if (!response.deleteUserAddress?.userAddressOrErrors.errors) {
      onShowToast && onShowToast(true, "Deleted")
    }
  }

  const createOrUpdateAddressSuccess = (
    address?: UpdateUserAddressMutation$data & CreateUserAddressMutation$data
  ) => {
    refetchAddresses(() => {
      if (address?.createUserAddress) {
        onAddressCreate && onAddressCreate(address.createUserAddress)
      } else if (address?.updateUserAddress) {
        onAddressEdit && onAddressEdit(address.updateUserAddress)
      }
    })

    onShowToast && onShowToast(true, "Saved")
  }

  const handleEditAddress = (address: Address) => {
    setAddress(address)
    setShowAddressModal(true)
    setModalDetails({
      addressModalTitle: "Edit address",
      addressModalAction: "editUserAddress",
    })
  }

  const handleAddNewAddressClick = () => {
    trackEvent({
      action: ActionType.clickedAddNewShippingAddress,
      context_page_owner_type: OwnerType.ordersShipping,
      context_module: ContextModule.ordersShipping,
    })
    setAddress(null)
    setShowAddressModal(true)
    setModalDetails({
      addressModalTitle: "Add address",
      addressModalAction: "createUserAddress",
    })
  }

  return (
    <>
      <RadioGroup
        onSelect={onSelect}
        defaultValue={selectedAddress || defaultAddressIndex(addressList)}
      >
        {compact(addressList).map((address, index) => {
          return (
            <BorderedRadio
              value={address.internalID}
              key={index}
              position="relative"
              data-test="savedAddress"
            >
              <SavedAddressItem
                index={index}
                address={address}
                handleClickEdit={() => handleEditAddress(address)}
              />
            </BorderedRadio>
          )
        })}
      </RadioGroup>
      <Spacer y={14} />
      {addressList.length > 0 && (
        <Button
          mt={[2, 4]}
          mb={2}
          data-test="shippingButton"
          variant="secondaryBlack"
          onClick={handleAddNewAddressClick}
        >
          Add a new address
        </Button>
      )}
      <AddressModal
        show={showAddressModal}
        modalDetails={modalDetails}
        closeModal={() => setShowAddressModal(false)}
        address={address || undefined}
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
