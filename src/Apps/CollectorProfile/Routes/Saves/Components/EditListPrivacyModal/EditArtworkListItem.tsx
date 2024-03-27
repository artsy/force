import { Flex, Image, Toggle, Text, Spacer } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { EditArtworkListItem_item$data } from "__generated__/EditArtworkListItem_item.graphql"
import { useFormikContext } from "formik"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import NoArtIcon from "@artsy/icons/NoArtIcon"
import { EditListPrivacyFormModel } from "Apps/CollectorProfile/Routes/Saves/Components/EditListPrivacyModal/EditListPrivacyModal"
import HideIcon from "@artsy/icons/HideIcon"

interface EditArtworkListItemProps {
  item: EditArtworkListItem_item$data
}

export const EditArtworkListItem: FC<EditArtworkListItemProps> = props => {
  const { item } = props
  const artworkNodes = extractNodes(item.artworksConnection)
  const imageURL = artworkNodes[0]?.image?.resized?.src ?? null
  const totalArtworks = item.artworksCount ?? 0
  const { values, setFieldValue } = useFormikContext<EditListPrivacyFormModel>()

  return (
    <Flex justifyContent="space-between">
      <Flex alignItems="center">
        {imageURL ? (
          <Image
            src={imageURL ?? ""}
            width={[40, 60]}
            height={[40, 60]}
            lazyLoad
            alt="Artwork image"
          />
        ) : (
          <ArtworkImagePlaceholder />
        )}

        <Flex flexDirection="column">
          <Flex alignItems="center">
            <Text variant={["xs", "sm"]} paddingLeft={1}>
              {item.name}
            </Text>

            <Spacer x={[0.5, 1]} />

            {!values[item.internalID] && <HideIcon data-testid="HideIcon" />}
          </Flex>

          <Text variant="xs" color="black60" paddingLeft={1}>
            {totalArtworks === 1
              ? `${totalArtworks} artwork`
              : `${totalArtworks} artworks`}
          </Text>
        </Flex>
      </Flex>

      <Flex alignItems="center">
        <Text variant="sm" display={["none", "block"]}>
          {values[item.internalID] ? "Shared" : "Private"}
        </Text>

        <Spacer x={2} />

        <Toggle
          aria-label={
            values[item.internalID]
              ? "Toggle list privacy to private"
              : "Toggle list privacy to shared"
          }
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
        artworksCount(onlyVisible: true)
        artworksConnection(first: 4) {
          edges {
            node {
              image {
                resized(width: 200, version: ["square"]) {
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

const ArtworkImagePlaceholder = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width={[40, 60]}
      height={[40, 60]}
      backgroundColor="black10"
      aria-label="Image placeholder"
    >
      <NoArtIcon width={18} height={18} fill="black60" />
    </Flex>
  )
}
