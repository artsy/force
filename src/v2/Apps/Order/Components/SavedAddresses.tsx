import {
  Box,
  Button,
  RadioGroup,
  BorderedRadio,
  Spacer,
  Flex,
  Text,
  RadioProps,
  BorderBox,
  Separator,
} from "@artsy/palette"
import React, { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import styled from "styled-components"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import { AddressModal } from "v2/Apps/Order/Components/AddressModal"
import { CommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import createLogger from "v2/Utils/logger"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30
type AddressNode = SavedAddresses_me["addressConnection"]["edges"][number]["node"]
interface AddressListProps {
  address: AddressNode
  handleClickEdit: (number) => void
  index: number
}
interface SavedAddressesProps {
  me: SavedAddresses_me
  onSelect?: (string) => void
  handleClickEdit: (number) => void
  inCollectorProfile?: boolean
  commitMutation?: CommitMutation
  relay: RelayRefetchProp
  addressCount?: number
}

const SavedAddressItem: React.FC<AddressListProps> = (
  props
): React.ReactElement<RadioProps> => {
  const handleClickEdit = props?.handleClickEdit
  const index = props?.index
  const address = props?.address
  const addressLine1 = address?.addressLine1
  const addressLine2 = address?.addressLine2
  const addressLine3 = address?.addressLine3
  const city = address?.city
  const country = address?.country
  const name = address?.name
  const phoneNumber = address?.phoneNumber
  const postalCode = address?.postalCode
  const region = address?.region
  const formattedAddressLine = [city, region, country, postalCode]
    .filter(el => el)
    .join(", ")
  const nameAndAddressLine = [name, addressLine1, addressLine2, addressLine3]

  return (
    <Flex width="100%">
      <Flex flexDirection="column">
        {nameAndAddressLine.length > 0 &&
          nameAndAddressLine.map(
            (line: string, index: number) =>
              line && (
                <Text
                  style={{ textTransform: "capitalize" }}
                  variant="text"
                  key={index}
                >
                  {line}
                </Text>
              )
          )}
        <Text textColor="black60" style={{ textTransform: "capitalize" }}>
          {formattedAddressLine}
        </Text>
        <Text textColor="black60">{phoneNumber}</Text>
      </Flex>
      <EditButton
        position="absolute"
        top={2}
        right={2}
        onClick={() => {
          handleClickEdit(index)
        }}
        textColor="blue100"
        size="2"
        data-test="edit-address"
      >
        Edit
      </EditButton>
    </Flex>
  )
}

const defaultAddressIndex = addressList => {
  const indexOfDefaultAddress = addressList.findIndex(
    address => address.node.isDefault
  )
  return `${indexOfDefaultAddress > -1 ? indexOfDefaultAddress : 0}`
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const [showAddressModal, setShowAddressModal] = useState(false)
  const logger = createLogger("SavedAddresses.tsx")

  const { onSelect, handleClickEdit, me, inCollectorProfile, relay } = props
  const addressList = me?.addressConnection?.edges ?? []
  const handleModal = () => {
    setShowAddressModal(!showAddressModal)
  }
  const collectorProfileAddressItems = addressList.map((address, index) => {
    if (!address.node) {
      return null
    }

    const isDefaultAddress = address.node.isDefault

    return (
      <BorderBox
        p={2}
        width="100%"
        flexDirection="column"
        key={address.node.internalID}
      >
        <SavedAddressItem
          index={index}
          address={address.node}
          handleClickEdit={handleClickEdit}
        />
        <Separator my={1} />
        <ModifyAddressWrapper>
          {!isDefaultAddress && (
            <Box mr={1}>
              <Text variant="text" color="black60">
                Set as Default
              </Text>
            </Box>
          )}
          <Box mr={1}>
            <Text variant="text" color="blue100">
              Edit
            </Text>
          </Box>
          <Box>
            <Text variant="text" color="red100">
              Delete
            </Text>
          </Box>
        </ModifyAddressWrapper>
      </BorderBox>
    )
  })

  const addAddressButton = (
    <>
      <Button
        mt={addressList.length > 0 ? 3 : 0}
        variant="primaryBlack"
        size="large"
        onClick={() => handleModal()}
      >
        Add new address
      </Button>
      {showAddressModal && (
        <AddressModal
          show={showAddressModal}
          modalDetails={{
            addressModalTitle: "Add new address",
            addressModalAction: "createUserAddress",
          }}
          closeModal={() => handleModal()}
          address={null}
          onSuccess={() => {
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
          }}
          commitMutation={props.commitMutation}
          onError={message => {
            logger.error(message)
          }}
          me={me}
        />
      )}
    </>
  )

  const addressItems = addressList
    .map((address, index) => {
      return (
        <BorderedRadio
          value={`${index}`}
          key={index}
          position="relative"
          data-test="savedAddress"
        >
          <SavedAddressItem
            index={index}
            address={address.node}
            handleClickEdit={handleClickEdit}
          />
        </BorderedRadio>
      )
    })
    .concat([
      <BorderedRadio value={NEW_ADDRESS} key="new-address">
        <Text variant="text">Add a new shipping address</Text>
      </BorderedRadio>,
    ])

  return inCollectorProfile ? (
    <>
      <Flex flexDirection="column">{collectorProfileAddressItems}</Flex>
      {addAddressButton}
    </>
  ) : (
    <>
      {addAddressButton}
      <RadioGroup
        onSelect={onSelect}
        defaultValue={defaultAddressIndex(addressList)}
      >
        {addressItems}
      </RadioGroup>
      <Spacer p="2" />
    </>
  )
}

const EditButton = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`
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
