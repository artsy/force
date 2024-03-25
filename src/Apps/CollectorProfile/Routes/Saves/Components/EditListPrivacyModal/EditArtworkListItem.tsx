import { Flex, Image, Toggle } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { EditArtworkListItem_item$data } from "__generated__/EditArtworkListItem_item.graphql"
import { useFormikContext } from "formik"

interface EditArtworkListItemProps {
  item: EditArtworkListItem_item$data
}

interface EditListPrivacyFormModel {
  [key: string]: boolean
}

const EditArtworkListItem: FC<EditArtworkListItemProps> = props => {
  const { item } = props
  const artworkNodes = extractNodes(item.artworksConnection)
  const imageURL = artworkNodes[0]?.image?.url ?? null
  const { values, setFieldValue } = useFormikContext<EditListPrivacyFormModel>()

  return (
    <Flex>
      <Image src={imageURL ?? ""} width="50px" height="50px" lazyLoad />
      {item.name}
      <Toggle
        selected={values[item.internalID]}
        onSelect={value => {
          setFieldValue(item.internalID, value)
        }}
      />
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
                url(version: "square")
              }
            }
          }
        }
      }
    `,
  }
)
