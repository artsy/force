import {
  Box,
  Button,
  RadioGroup,
  BorderedRadio,
  Spacer,
  Flex,
  Text,
  Separator,
  BorderBox,
  Join,
  Clickable,
} from "@artsy/palette"
import React, { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import styled from "styled-components"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import {
  AddressModal,
  ModalDetails,
} from "v2/Apps/Order/Components/AddressModal"
import { CommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import createLogger from "v2/Utils/logger"
import { SavedAddressItem } from "v2/Apps/Order/Components/SavedAddressItem"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"
import { updateUserDefaultAddress } from "v2/Apps/Order/Mutations/UpdateUserDefaultAddress"
import { useSystemContext } from "v2/System/SystemContext"
import { compact } from "lodash"
import { extractNodes } from "v2/Utils/extractNodes"
import { UpdateUserAddressMutationResponse } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutationResponse } from "v2/__generated__/CreateUserAddressMutation.graphql"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

interface SavedAddressesProps {
  me: SavedAddresses_me
  onSelect?: (string) => void
  inCollectorProfile: boolean
  commitMutation?: CommitMutation
  relay: RelayRefetchProp
  addressCount?: number
  onAddressDelete?: (removedAddressId: string) => void
  onAddressCreate?: (
    address: CreateUserAddressMutationResponse["createUserAddress"]
  ) => void
  onAddressEdit?: (
    address: UpdateUserAddressMutationResponse["updateUserAddress"]
  ) => void
  selectedAddress?: string
  onShowToast?: (isShow: boolean, action: string) => void
}

type Address = NonNullable<
  NonNullable<
    NonNullable<NonNullable<SavedAddresses_me["addressConnection"]>["edges"]>[0]
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
  const [modalDetails, setModalDetails] = useState<ModalDetails | undefined>()
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false)
  const [address, setAddress] = useState<Address | undefined | null>(null)
  const logger = createLogger("SavedAddresses.tsx")
  const {
    onSelect,
    me,
    inCollectorProfile,
    relay,
    onAddressDelete,
    onAddressCreate,
    selectedAddress,
    onShowToast,
    onAddressEdit,
  } = props
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
      // @ts-expect-error STRICT_NULL_CHECK
      relayEnvironment,
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

  const handleEditAddress = (address: Address, index: number) => {
    setShowAddressModal(true)
    setModalDetails({
      addressModalTitle: "Edit address",
      addressModalAction: "editUserAddress",
    })
    setAddress(address)
  }

  const handleSetDefaultAddress = (addressID: string) => {
    updateUserDefaultAddress(
      relayEnvironment!,
      addressID,
      () => refetchAddresses(),
      onError
    )
  }

  const createOrUpdateAddressSuccess = (
    address?: UpdateUserAddressMutationResponse &
      CreateUserAddressMutationResponse
  ) => {
    refetchAddresses()

    if (address?.createUserAddress) {
      onAddressCreate && onAddressCreate(address.createUserAddress)
    } else if (address?.updateUserAddress) {
      onAddressEdit && onAddressEdit(address.updateUserAddress)
    }
    onShowToast && onShowToast(true, "Saved")
  }

  const collectorProfileAddressItems = addressList.map((address, index) => {
    if (!address) {
      return null
    }

    const isDefaultAddress = address.isDefault

    return (
      <BorderBox
        p={2}
        width="100%"
        flexDirection="column"
        key={"addressIndex" + index}
      >
        <SavedAddressItem
          index={index}
          address={address}
          handleClickEdit={() => handleEditAddress(address, index)}
        />
        <Separator my={1} />
        <ModifyAddressWrapper>
          {!isDefaultAddress && (
            <Box mr={[3, 1]}>
              <Text
                onClick={() => handleSetDefaultAddress(address.internalID)}
                variant="text"
                color="black60"
                style={{
                  cursor: "pointer",
                }}
              >
                Set as Default
              </Text>
            </Box>
          )}
          <Box mr={[3, 1]}>
            <Clickable
              data-test="editAddressInProfileClick"
              onClick={() => handleEditAddress(address, index)}
            >
              <Text
                variant="text"
                color="blue100"
                style={{
                  cursor: "pointer",
                }}
                data-test="editAddressInProfile"
              >
                Edit
              </Text>
            </Clickable>
          </Box>
          <Box>
            <Clickable
              data-test="deleteAddressInProfile"
              onClick={() => handleDeleteAddress(address.internalID)}
            >
              <Text
                variant="text"
                color="red100"
                style={{
                  cursor: "pointer",
                }}
              >
                Delete
              </Text>
            </Clickable>
          </Box>
        </ModifyAddressWrapper>
      </BorderBox>
    )
  })

  const addAddressButton = (
    <>
      {inCollectorProfile ? (
        <Button
          data-test="profileButton"
          mt={2}
          variant="primaryBlack"
          size="large"
          onClick={() => {
            setShowAddressModal(true),
              setModalDetails({
                addressModalTitle: "Add new address",
                addressModalAction: "createUserAddress",
              })
          }}
        >
          Add a new address
        </Button>
      ) : (
        addressList.length > 0 && (
          <Button
            data-test="shippingButton"
            variant="secondaryOutline"
            onClick={() => {
              setShowAddressModal(true),
                setModalDetails({
                  addressModalTitle: "Add address",
                  addressModalAction: "createUserAddress",
                })
            }}
          >
            Add a new address
          </Button>
        )
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
          index={index}
          address={address}
          handleClickEdit={() => handleEditAddress(address, index)}
        />
      </BorderedRadio>
    )
  })

  return inCollectorProfile ? (
    <>
      <Flex flexDirection="column">
        <Join separator={<Spacer mb="1" />}>
          {collectorProfileAddressItems}
        </Join>
      </Flex>
      {addAddressButton}
    </>
  ) : (
    <>
      <RadioGroup
        onSelect={onSelect}
        defaultValue={selectedAddress || defaultAddressIndex(addressList)}
      >
        {addressItems}
      </RadioGroup>
      <Spacer mb={14} />
      {addAddressButton}
      <Spacer mb={4} />
    </>
  )
}

const ModifyAddressWrapper = styled(Flex)`
  align-self: flex-end;
  justify-content: space-between;
`

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
    query SavedAddressesRefetchQuery {
      me {
        ...SavedAddresses_me
      }
    }
  `
)
