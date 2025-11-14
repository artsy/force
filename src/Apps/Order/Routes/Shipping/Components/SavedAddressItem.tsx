import type { SavedAddressType } from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { type BoxProps, Flex, type RadioProps, Text } from "@artsy/palette"
import type * as React from "react"
import styled from "styled-components"

interface SavedAddressItemProps extends BoxProps {
  address: SavedAddressType
  handleClickEdit: (event: any) => void
}

export const SavedAddressItem: React.FC<
  React.PropsWithChildren<SavedAddressItemProps>
> = (props): React.ReactElement<RadioProps<string>> => {
  const handleClickEdit = props.handleClickEdit
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
                    textColor={index === 0 ? "mono100" : "mono60"}
                  >
                    {line}
                  </Text>
                </Flex>
              ),
          )}
        <Text textColor="mono60" textTransform="capitalize" variant="sm">
          {formattedAddressLine}
        </Text>
        <Text textColor="mono60" variant="sm">
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
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          handleClickEdit(address)
        }}
        onKeyPress={event => {
          if (event.key !== "Enter") {
            return
          }
          handleClickEdit(event)
        }}
        data-testid="editAddressInShipping"
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
