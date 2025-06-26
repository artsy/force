import {
  Box,
  Button,
  Column,
  GridColumns,
  Image,
  Stack,
  Text,
} from "@artsy/palette"
import {
  AboutPressShelf,
  AboutPressShelfPlaceholder,
} from "Apps/About2/Components/AboutPressShelf"
import { AboutSection } from "Apps/About2/Components/AboutSection"
import { RouterLink } from "System/Components/RouterLink"
import { Suspense } from "react"

export const AboutPress = () => {
  return (
    <AboutSection id="press">
      <GridColumns gridRowGap={4}>
        <Column
          span={10}
          start={2}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Text variant="xl">Artsy In the Media</Text>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="sm-display">Featured by:</Text>

            <Stack gap={2} flexDirection="row">
              {LOGOS.map(({ src, name, width, height }) => (
                <Image
                  height={18}
                  key={name}
                  src={src}
                  alt={name}
                  style={{ aspectRatio: `${width} / ${height}` }}
                  loading="lazy"
                />
              ))}
            </Stack>
          </Box>

          <Suspense fallback={<AboutPressShelfPlaceholder />}>
            <AboutPressShelf />
          </Suspense>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="lg-display">
              Contact: <a href="mailto:press@artsy.net">press@artsy.net</a>
            </Text>

            <Button
              // @ts-ignore
              as={RouterLink}
              to="/press"
              variant="primaryBlack"
            >
              Visit Artsy’s Press Page
            </Button>
          </Box>
        </Column>
      </GridColumns>
    </AboutSection>
  )
}

const LOGOS: {
  src: string
  name: string
  width: number
  height: number
}[] = [
  {
    src: "https://files.artsy.net/images/logo-forbes.png",
    name: "Forbes",
    width: 148,
    height: 36,
  },
  {
    src: "https://files.artsy.net/images/logo-the-new-york-times.png",
    name: "The New York Times",
    width: 388,
    height: 58,
  },
  {
    src: "https://files.artsy.net/images/logo-bloomberg.png",
    name: "Bloomberg",
    width: 259,
    height: 54,
  },
  {
    src: "https://files.artsy.net/images/logo-fast-company.png",
    name: "Fast Company",
    width: 223,
    height: 41,
  },
  {
    src: "https://files.artsy.net/images/logo-techcrunch.png",
    name: "TechCrunch",
    width: 275,
    height: 48,
  },
]
