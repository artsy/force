import { Flex, Text, RadioProps } from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"

type AddressNode = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<SavedAddresses_me$data["addressConnection"]>["edges"]
    >[number]
  >["node"]
>

interface SavedAddressItemProps {
  address: AddressNode
  handleClickEdit: (number) => void
  index: number
}

export const SavedAddressItem: React.FC<SavedAddressItemProps> = (
  props
): React.ReactElement<RadioProps<string>> => {
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
    <Flex maxWidth="100%">
      <Flex flexDirection="column">
        {nameAndAddressLine.length > 0 &&
          nameAndAddressLine.map(
            (line: string, index: number) =>
              line && (
                <Flex
                  key={index}
                  justifyContent="row"
                  alignItems="center"
                  mb={index === 0 ? 1 : 0}
                  height={24}
                >
                  <Text
                    variant="sm-display"
                    textTransform="capitalize"
                    textColor={index === 0 ? "black100" : "black60"}
                  >
                    {line}
                  </Text>
                </Flex>
              )
          )}
        <Text textColor="black60" textTransform="capitalize" variant="sm">
          {formattedAddressLine}
        </Text>
        <Text textColor="black60" variant="sm">
          {phoneNumber}
        </Text>
      </Flex>
      <EditButton
        textColor="blue100"
        variant="sm"
        position="absolute"
        top={2}
        right={2}
        tabIndex={0}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()

          handleClickEdit(index)
        }}
        onKeyPress={event => {
          event.preventDefault()
          event.stopPropagation()

          event.key === "Enter" && handleClickEdit(index)
        }}
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
