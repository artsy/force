import { RadioGroup, BorderedRadio, Spacer, Flex, Text } from "@artsy/palette"
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

const renderAddressList = (addressList, handleClickEdit) => {
  return addressList.map((address, index) => {
    const {
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      country,
      name,
      phoneNumber,
      postalCode,
      region,
    } = address?.node

    const formattedAddressLine = [city, region, country, postalCode]
      .filter(el => el)
      .join(", ")
    return (
      <BorderedRadio
        value={`${index}`}
        key={index}
        position="relative"
        data-test="savedAddress"
      >
        <Flex width="100%">
          <Flex flexDirection="column">
            {[name, addressLine1, addressLine2, addressLine3].map(
              (line, index) =>
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
              // TODO: ideally we don't want the radio selection to change when clicking this
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
              handleClickEdit(index)
            }}
            textColor="blue100"
            size="2"
          >
            Edit
          </EditButton>
        </Flex>
      </BorderedRadio>
    )
  })
}

const defaultAddressIndex = addressList => {
  const indexOfDefaultAddress = addressList.findIndex(
    address => address.node.isDefault
  )
  return `${indexOfDefaultAddress > -1 ? indexOfDefaultAddress : 0}`
}

interface Props {
  me: SavedAddresses_me
  onSelect: (string) => void
  handleClickEdit: (number) => void
}

const SavedAddresses: React.FC<Props> = props => {
  const { onSelect, handleClickEdit, me } = props
  const addressList = me.addressConnection.edges

  return (
    <>
      <RadioGroup
        onSelect={onSelect}
        defaultValue={defaultAddressIndex(addressList)}
      >
        {renderAddressList(addressList, handleClickEdit)}
        <BorderedRadio value={NEW_ADDRESS}>
          <Text variant="text">Add a new shipping address</Text>
        </BorderedRadio>
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
