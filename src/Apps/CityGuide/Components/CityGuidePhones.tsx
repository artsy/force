import { Box, Flex, Image } from "@artsy/palette"
import type { FC } from "react"

interface Phone {
  src: string
  alt: string
  size: "front" | "middle" | "outer"
}

// Left to right: London map, Frieze Week guide, London City Guide (front), Add to Itinerary, London itinerary
const PHONES: Phone[] = [
  {
    src: "/city-guide-on-app/assets/v3/map.webp",
    alt: "The City Guide map of London with galleries and museums",
    size: "outer",
  },
  {
    src: "/city-guide-on-app/assets/v3/frieze-week-guide.webp",
    alt: "A Frieze Week London guide by Artsy editors",
    size: "middle",
  },
  {
    src: "/city-guide-on-app/assets/v3/city-guide.webp",
    alt: "City Guide for London in the Artsy app, with guides for Frieze Week",
    size: "front",
  },
  {
    src: "/city-guide-on-app/assets/v3/add-to-itinerary.webp",
    alt: "Adding a show to an itinerary from the London map",
    size: "middle",
  },
  {
    src: "/city-guide-on-app/assets/v3/itinerary.webp",
    alt: "A London itinerary for Frieze Week in the Artsy app",
    size: "outer",
  },
]

// Widths for the xs, sm and md breakpoints. The images include their own shadow.
const WIDTHS: Record<Phone["size"], string[]> = {
  front: ["31vw", "240px", "330px"],
  middle: ["26.35vw", "204px", "290px"],
  outer: ["21.7vw", "168px", "250px"],
}

const Z_INDEXES: Record<Phone["size"], number> = {
  front: 3,
  middle: 2,
  outer: 1,
}

const TUCK = ["-8.5vw", "-66px", "-90px"]

export const CityGuidePhones: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Flex
      width="100%"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      pb={4}
    >
      {PHONES.map(({ src, alt, size }, index) => {
        const isLeftOfFront = index < 2
        const isRightOfFront = index > 2

        return (
          <Box
            key={src}
            flex="none"
            position="relative"
            zIndex={Z_INDEXES[size]}
            width={WIDTHS[size]}
            mr={isLeftOfFront ? TUCK : undefined}
            ml={isRightOfFront ? TUCK : undefined}
          >
            <Image src={src} alt={alt} width="100%" height="auto" />
          </Box>
        )
      })}
    </Flex>
  )
}
