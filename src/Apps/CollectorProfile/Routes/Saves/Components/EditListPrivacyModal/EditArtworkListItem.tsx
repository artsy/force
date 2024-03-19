import { Flex } from "@artsy/palette"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { EditArtworkListItem_item$data } from "__generated__/EditArtworkListItem_item.graphql"

interface EditArtworkListItemProps {
  item: EditArtworkListItem_item$data
}

const EditArtworkListItem: FC<EditArtworkListItemProps> = props => {
  const { item } = props
  const { t } = useTranslation()
  const artworkNodes = extractNodes(item.artworksConnection)
  const imageURL = artworkNodes.map(node => node.image?.url ?? null)
  return (
    <Flex>
      {item.name}
      {item.shareableWithPartners ? "yes" : "no"}
      {imageURL}
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
        shareableWithPartners
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
