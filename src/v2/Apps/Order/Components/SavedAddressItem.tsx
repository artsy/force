import {
  Flex,
  Text,
  RadioProps,
  useThemeConfig,
  TextVariant,
} from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { SavedAddresses_me$data } from "v2/__generated__/SavedAddresses_me.graphql"

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

  const styles = useThemeConfig({
    v2: {
      smVariant: "text" as TextVariant,
      xsVariant: "caption" as TextVariant,
    },
    v3: {
      smVariant: "sm" as TextVariant,
      xsVariant: "xs" as TextVariant,
    },
  })

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
                    textTransform="capitalize"
                    textColor={index === 0 ? "black100" : "black60"}
                    variant={styles.smVariant}
                  >
                    {line}
                  </Text>
                </Flex>
              )
          )}
        <Text
          textColor="black60"
          textTransform="capitalize"
          variant={styles.smVariant}
        >
          {formattedAddressLine}
        </Text>
        <Text textColor="black60" variant={styles.smVariant}>
          {phoneNumber}
        </Text>
      </Flex>
      <EditButton
        position="absolute"
        top={2}
        right={2}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()

          handleClickEdit(index)
        }}
        textColor="blue100"
        variant={styles.smVariant}
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
