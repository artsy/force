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
} from "@artsy/palette"
import React, { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import styled from "styled-components"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import {
  AddressModal,
  AddressModalAction,
} from "v2/Apps/Order/Components/AddressModal"
import { CommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import createLogger from "v2/Utils/logger"
import { SavedAddressItem } from "v2/Apps/Order/Components/SavedAddressItem"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"
import { updateUserDefaultAddress } from "v2/Apps/Order/Mutations/UpdateUserDefaultAddress"
import { useSystemContext } from "v2/System/SystemContext"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

interface SavedAddressesProps {
  me: SavedAddresses_me
  onSelect?: (string) => void
  inCollectorProfile: boolean
  commitMutation?: CommitMutation
  relay: RelayRefetchProp
  addressCount?: number
  onAddressDelete?: (isLast: boolean) => void
  selectedAddress?: string
}
// @ts-expect-error STRICT_NULL_CHECK
type Address = SavedAddresses_me["addressConnection"]["edges"][0]["node"]

const defaultAddressIndex = addressList => {
  const indexOfDefaultAddress = addressList.findIndex(
    address => address.node.isDefault
  )
  return `${indexOfDefaultAddress > -1 ? indexOfDefaultAddress : 0}`
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const [modalDetails, setModalDetails] = useState({
    // @ts-expect-error STRICT_NULL_CHECK
    addressModalTitle: null as string,
    // @ts-expect-error STRICT_NULL_CHECK
    addressModalAction: null as AddressModalAction,
  })
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false)
  const [address, setAddress] = useState(null as Address)
  const logger = createLogger("SavedAddresses.tsx")
  const {
    onSelect,
    me,
    inCollectorProfile,
    relay,
    onAddressDelete,
    selectedAddress,
  } = props
  const addressList = me?.addressConnection?.edges ?? []
  const { relayEnvironment } = useSystemContext()

  const onSuccess = () => {
    relay.refetch(
      {
        first: PAGE_SIZE,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
        }
      }
    )
  }

  const onError = (message: string) => {
    logger.error(message)
  }

  const handleDeleteAddress = (addressID: string) => {
    // @ts-expect-error STRICT_NULL_CHECK
    deleteUserAddress(relayEnvironment, addressID, onSuccess, onError)
    onAddressDelete && onAddressDelete(addressList.length === 1)
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
    // @ts-expect-error STRICT_NULL_CHECK
    updateUserDefaultAddress(relayEnvironment, addressID, onSuccess, onError)
  }

  const collectorProfileAddressItems = addressList.map((address, index) => {
    // @ts-expect-error STRICT_NULL_CHECK
    if (!address.node) {
      return null
    }

    // @ts-expect-error STRICT_NULL_CHECK
    const isDefaultAddress = address.node.isDefault

    return (
      <BorderBox
        p={2}
        width="100%"
        flexDirection="column"
        key={"addressIndex" + index}
      >
        <SavedAddressItem
          index={index}
          // @ts-expect-error STRICT_NULL_CHECK
          address={address.node}
          handleClickEdit={() => handleEditAddress(address?.node, index)}
        />
        <Separator my={1} />
        <ModifyAddressWrapper>
          {!isDefaultAddress && (
            <Box mr={[3, 1]}>
              <Text
                // @ts-expect-error STRICT_NULL_CHECK
                onClick={() => handleSetDefaultAddress(address.node.internalID)}
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
            <Text
              onClick={() => handleEditAddress(address?.node, index)}
              variant="text"
              color="blue100"
              style={{
                cursor: "pointer",
              }}
              data-test="editAddressInProfile"
            >
              Edit
            </Text>
          </Box>
          <Box>
            <Text
              // @ts-expect-error STRICT_NULL_CHECK
              onClick={() => handleDeleteAddress(address.node.internalID)}
              variant="text"
              color="red100"
              style={{
                cursor: "pointer",
              }}
            >
              Delete
            </Text>
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
            width={159}
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
        address={address}
        onSuccess={onSuccess}
        onDeleteAddress={handleDeleteAddress}
        onError={onError}
        me={me}
      />
    </>
  )

  const addressItems = addressList.map((address, index) => {
    return (
      <BorderedRadio
        value={`${index}`}
        key={index}
        position="relative"
        data-test="savedAddress"
      >
        <SavedAddressItem
          index={index}
          // @ts-expect-error STRICT_NULL_CHECK
          address={address.node}
          handleClickEdit={() => handleEditAddress(address?.node, index)}
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
      <Spacer mb={3} />
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
