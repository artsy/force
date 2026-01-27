import {
  Box,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Text,
  useTheme,
} from "@artsy/palette"
import type { ColumnProps } from "@artsy/palette"
import { resized } from "Utils/resized"

interface HeroImage {
  src: string
  credit: string
  bg: string
  pt?: ColumnProps["pt"]
  display?: ColumnProps["display"]
}

const HERO_IMAGES: HeroImage[] = [
  {
    src: "https://files.artsy.net/images/about2-header-1.jpg",
    credit: "Moritz Moll, Sundown, 2023. MXM Galeria.",
    bg: "mono10",
  },
  {
    src: "https://files.artsy.net/images/about2-header-2-2.jpg",
    credit:
      "Caleb Hahne Quintana, The Sun Will Remember Your Shadow, 2020. 1969 Gallery.",
    bg: "mono15",
    pt: [40, 100],
  },
  {
    src: "https://files.artsy.net/images/about2-header-3-3.jpg",
    credit: "Derek Fordjour, Emergent Disposition, 2015. Larkin Durey.",
    bg: "mono10",
    display: ["none", "block"],
  },
]

export const AboutHero = () => {
  return (
    <GridColumns gridColumnGap={0}>
      {HERO_IMAGES.map((image, index) => (
        <AboutHeroImage key={index} {...image} />
      ))}
    </GridColumns>
  )
}

const AboutHeroImage = ({ src, credit, bg, pt, display }: HeroImage) => {
  const { theme } = useTheme()
  const rgb = theme.name === "light" ? "255, 255, 255" : "0, 0, 0"
  const background =
    theme.name === "light"
      ? "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)"
      : "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)"

  return (
    <Column span={[6, 4]} pt={pt} display={display}>
      <ResponsiveBox
        bg={bg}
        aspectWidth={1280}
        aspectHeight={1500}
        maxWidth="100%"
        position="relative"
      >
        <Image
          {...resized(src, { width: 500 })}
          width="100%"
          height="100%"
          alt=""
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          width="100%"
          px={2}
          pb={1}
          pt={6}
          background={background}
          display={["none", "block"]}
        >
          <Text
            variant="xs"
            color={`rgba(${rgb}, 0.7)`}
            style={{ textShadow: theme.effects.textShadow }}
          >
            {credit}
          </Text>
        </Box>
      </ResponsiveBox>
    </Column>
  )
}
