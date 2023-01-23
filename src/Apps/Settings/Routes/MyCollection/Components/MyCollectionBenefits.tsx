import {
  Box,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"

export const MyCollectionBenefits: React.FC = () => {
  const infos = [
    {
      title: "Create a private record of your artworks",
      subtitle: "View your collection online easily and securely in one place.",
    },
    {
      title: "Get insights on your collection",
      subtitle:
        "Track market demand and get insight into the market value of artworks in your collection.",
    },
    {
      title: "Keep track of artists you collect",
      subtitle:
        "Discover more about the artists you collect, with latest career news and auction results.",
    },
  ]
  const image = resized(
    "https://files.artsy.net/images/my-coll-benefits-img.jpg",
    {
      width: 910,
      height: 652,
    }
  )

  const DesktopLayout = () => (
    <GridColumns gridRowGap={[4, 6]}>
      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={910} maxWidth="100%">
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt="An artwork image"
          />
        </ResponsiveBox>
      </Column>

      <Column span={6}>
        {infos.map((info, index) => (
          <Box key={info.title + index}>
            <Text variant="xl">{info.title}</Text>

            <Text variant="sm" mb={4}>
              {info.subtitle}
            </Text>
          </Box>
        ))}
      </Column>
    </GridColumns>
  )

  const MobileLayout = () => (
    <GridColumns gridRowGap={[0, 6]}>
      <Column span={6}>
        {infos.map((info, index) => (
          <Box key={info.title + index}>
            <Text variant="lg-display">{info.title}</Text>

            <Text variant="sm" mt={0.5} mb={4}>
              {info.subtitle}
            </Text>
          </Box>
        ))}
      </Column>

      <Column span={6} mb={2}>
        <ResponsiveBox aspectHeight={652} aspectWidth={910} maxWidth="100%">
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt="My Collection benefits image"
          />
        </ResponsiveBox>
      </Column>
    </GridColumns>
  )

  return (
    <>
      <Media at="xs">
        <MobileLayout />
      </Media>
      <Media greaterThan="xs">
        <DesktopLayout />
      </Media>
    </>
  )
}
