import {
  Box,
  RadioGroup,
  BorderedRadio,
  Spacer,
  Flex,
  Text,
  RadioProps,
  BorderBox,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"

const EditButton = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`
export const NEW_ADDRESS = "NEW_ADDRESS"

type AddressNode = SavedAddresses_me["addressConnection"]["edges"][number]["node"]

interface AddressListProps {
  address: AddressNode
  handleClickEdit: (number) => void
  index: number
}

const SavedAddressItem: React.FC<AddressListProps> = (
  props
): React.ReactElement<RadioProps> => {
  const handleClickEdit = props?.handleClickEdit
  const index = props?.index
  const address = props?.address
  const addressLine1 = address?.addressLine1 ?? ""
  const addressLine2 = address?.addressLine2 ?? ""
  const addressLine3 = address?.addressLine3 ?? ""
  const city = address?.city ?? ""
  const country = address?.country ?? ""
  const name = address?.name ?? ""
  const phoneNumber = address?.phoneNumber ?? ""
  const postalCode = address?.postalCode ?? ""
  const region = address?.region ?? ""
  const formattedAddressLine = [city, region, country, postalCode]
    .filter(el => el)
    .join(", ")
  const nameAndAddressLine = [name, addressLine1, addressLine2, addressLine3]

  return (
    <Flex width="100%">
      <Flex flexDirection="column">
        {nameAndAddressLine ??
          [].map(
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
        onClick={e => {
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

interface Props {
  me: SavedAddresses_me
  onSelect?: (string) => void
  handleClickEdit: (number) => void
  inCollectorProfile: boolean
}

const SavedAddresses: React.FC<Props> = props => {
  const { onSelect, handleClickEdit, me, inCollectorProfile } = props
  const addressList = me?.addressConnection?.edges ?? []

  const collectorProfileAddressItems = addressList.map((address, index) => {
    return (
      <BorderBox p={2} width="100%">
        <SavedAddressItem
          index={index}
          address={address.node}
          handleClickEdit={handleClickEdit}
        />
      </BorderBox>
    )
  })

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
    <Box>{collectorProfileAddressItems}</Box>
  ) : (
    <>
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

export const SavedAddressesFragmentContainer = createFragmentContainer(
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
  }
)
