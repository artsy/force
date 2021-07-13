import { Flex, Text, RadioProps, Pill } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"

// @ts-expect-error STRICT_NULL_CHECK
type AddressNode = SavedAddresses_me["addressConnection"]["edges"][number]["node"]

interface SavedAddressItemProps {
  address: AddressNode
  handleClickEdit: (number) => void
  index: number
}

export const SavedAddressItem: React.FC<SavedAddressItemProps> = (
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
                <Flex key={index} justifyContent="row" alignItems="center">
                  <Text
                    textTransform="capitalize"
                    textColor={index === 0 ? "black100" : "black60"}
                    variant="text"
                  >
                    {line}
                  </Text>
                  {address?.isDefault && index === 0 && (
                    <Pill ml={0.5} variant="textSquare" hover focus>
                      <Text
                        textColor="black60"
                        variant="caption"
                        display="inline"
                      >
                        Default
                      </Text>
                    </Pill>
                  )}
                </Flex>
              )
          )}
        <Text textColor="black60" textTransform="capitalize">
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
        data-test="editAddressInShipping"
      >
        Edit
      </EditButton>
    </Flex>
  )
}

const EditButton = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`
