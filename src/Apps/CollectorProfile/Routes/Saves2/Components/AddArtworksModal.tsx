import React from "react"
import {
  Flex,
  Text,
  ModalDialog,
  SkeletonBox,
  SkeletonText,
  GridColumns,
  Column,
  Spacer,
  Button,
} from "@artsy/palette"
import { SortFilter } from "Components/SortFilter"

interface AddArtworksModalProps {
  visible: boolean
  onClose: () => void
  onComplete: () => void
  listName: string
}

const TEMP_ARTWORKS = [
  {
    title: "Yacht Life",
    artist: {
      name: "Nelson De La Nuez",
    },
    partner: {
      name: "Artspace Warehouse",
    },
    price: "$8,000",
  },
  {
    title: "From Paris with Love",
    artist: {
      name: "Nelson De La Nuez",
    },
    partner: {
      name: "A.Style",
    },
    price: "$7,000",
  },
  {
    title: "Meital, Ziv, Mika & Shimshon",
    artist: {
      name: "Navot Miller",
    },
    partner: {
      name: "Yossi Milo Gallery",
    },
    price: "$14,000",
  },
  {
    title: "espacio derrotado",
    artist: {
      name: "Alexandre Arrechea",
    },
    partner: {
      name: "Reis Studios",
    },
    price: "$12,000",
  },
  {
    title: "Pears, Clinton, Connecticut",
    artist: {
      name: "Rodney Smith",
    },
    partner: {
      name: "Robert Klein Gallery",
    },
    price: "$20,000 - 50,000",
  },
  {
    title: "Collin with Magnifying Glass, Alberta, Canada",
    artist: {
      name: "Rodney Smith",
    },
    partner: {
      name: "Robert Klein Gallery",
    },
    price: "$10,000 - 40,000",
  },
  {
    title: "Youth",
    artist: {
      name: "Luke Smalley",
    },
    partner: {
      name: "CLAMP",
    },
    price: "$1,800",
  },
  {
    title: "Tatiana in Black Slip 2",
    artist: {
      name: "Richard Learoyd",
    },
    partner: {
      name: "Sotheby's",
    },
    price: "",
  },
  {
    title: "Long Black",
    artist: {
      name: "Richard Learoyd",
    },
    partner: {
      name: "Phillips",
    },
    price: "",
  },
  {
    title: "Fragment",
    artist: {
      name: "Richard Learoyd",
    },
    partner: {
      name: "Pace Gallery",
    },
    price: "",
  },
  {
    title: "U.A. Walker, New York",
    artist: {
      name: "Hiroshi Sugimoto",
    },
    partner: {
      name: "Obscura Gallery",
    },
    price: "$2,250 - 3,250",
  },
  {
    title: "Obliteration after Modigliani",
    artist: {
      name: "Richard Learoyd",
    },
    partner: {
      name: "Fraenkel Gallery",
    },
    price: "",
  },
  {
    title: "David Standing on Water No. 1, Sherwood Island, Connecticut",
    artist: {
      name: "Rodney Smith",
    },
    partner: {
      name: "Gilman Contemporary",
    },
    price: "$15,000 - 45,000",
  },
  {
    title: "Kiton Man, The Knole Estate, Long Island, New York",
    artist: {
      name: "Rodney Smith",
    },
    partner: {
      name: "Robert Klein Gallery",
    },
    price: "$10,000 - 40,000",
  },
  {
    title: "Kate Moss, Nepal, British Vogue",
    artist: {
      name: "Arthur Elgort",
    },
    partner: {
      name: "Atlas Gallery",
    },
    price: "$12,000 - 30,000",
  },
]

const AddArtworksModal: React.FC<AddArtworksModalProps> = ({
  listName,
  onClose,
}) => {
  return (
    <ModalDialog
      width={["100%", 713]}
      height={["100%", 800]}
      onClose={onClose}
      title={`${listName} created. Add saved works to the list.`}
      data-testid="CreateNewList"
      footer={
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <Text variant={"sm"}>{0} artworks selected</Text>

          <Button onClick={() => {}}>Save</Button>
        </Flex>
      }
    >
      <>
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <Text variant="sm">{TEMP_ARTWORKS.length} Artworks:</Text>

          <SortFilter
            sortOptions={[{ text: "Recently Saved", value: "-position" }]}
            selected={"-position"}
            onSort={() => {}}
          />
        </Flex>

        <Spacer y={1} />

        <GridColumns>
          {TEMP_ARTWORKS.map((artwork, index) => {
            const randomHeight = Math.floor(Math.random() * 100) + 100

            return (
              <Column span={4}>
                <Flex flexDirection={"column"}>
                  <SkeletonBox
                    key={index}
                    width={197}
                    height={randomHeight}
                    mb={1}
                  />
                  <SkeletonText variant="sm">${artwork.title}</SkeletonText>
                  <SkeletonText variant="sm">
                    ${artwork.artist.name}
                  </SkeletonText>
                  <SkeletonText variant="sm">
                    ${artwork.partner.name}
                  </SkeletonText>
                  <SkeletonText variant="sm">${artwork.price}</SkeletonText>
                </Flex>
              </Column>
            )
          })}
        </GridColumns>
      </>
    </ModalDialog>
  )
}

export const AddArtworksModalContainer: React.FC<AddArtworksModalProps> = props => {
  const { visible } = props

  if (!visible) return null

  return <AddArtworksModal {...props} />
}
