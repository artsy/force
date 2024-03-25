import { Flex, Image, Toggle, Text, Spacer } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { EditArtworkListItem_item$data } from "__generated__/EditArtworkListItem_item.graphql"
import { useFormikContext } from "formik"
import LockIcon from "@artsy/icons/LockIcon"

interface EditArtworkListItemProps {
  item: EditArtworkListItem_item$data
}

interface EditListPrivacyFormModel {
  [key: string]: boolean
}

const EditArtworkListItem: FC<EditArtworkListItemProps> = props => {
  const { item } = props
  const artworkNodes = extractNodes(item.artworksConnection)
  const imageURL = artworkNodes[0]?.image?.resized?.src ?? null
  const { values, setFieldValue } = useFormikContext<EditListPrivacyFormModel>()

  return (
    <Flex justifyContent="space-between">
      <Flex alignItems="center">
        <Image src={imageURL ?? ""} width="60px" height="60px" lazyLoad />
        <Text variant="sm" paddingLeft={1}>
          {item.name}
        </Text>
        <Spacer x={1} />
        {!values[item.internalID] && <LockIcon />}
      </Flex>
      <Flex alignItems="center">
        <Text variant="sm">
          {values[item.internalID] ? "Shared" : "Private"}
        </Text>
        <Spacer x={2} />
        <Toggle
          selected={values[item.internalID]}
          onSelect={value => {
            setFieldValue(item.internalID, value)
          }}
        />
      </Flex>
    </Flex>
  )
}

export const EditArtworkListItemFragmentContainer = createFragmentContainer(
  EditArtworkListItem,
  {
    item: graphql`
      fragment EditArtworkListItem_item on Collection {
        name
        internalID
        artworksConnection(first: 4) {
          edges {
            node {
              image {
                resized(width: 60, height: 60, version: ["square"]) {
                  src
                }
              }
            }
          }
        }
      }
    `,
  }
)
