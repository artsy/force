import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Box,
  Button,
  Column,
  GridColumns,
  Image,
  Stack,
  Text,
  useTheme,
} from "@artsy/palette"
import {
  AboutPressShelf,
  AboutPressShelfPlaceholder,
} from "Apps/About/Components/AboutPressShelf"
import { AboutSection } from "Apps/About/Components/AboutSection"
import { RouterLink } from "System/Components/RouterLink"
import { Suspense } from "react"
import { useTracking } from "react-tracking"

export const AboutPress = () => {
  const { theme } = useTheme()

  const { trackEvent } = useTracking()

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
          <Text variant="xl">Artsy in the Media</Text>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={["flex-start", "center"]}
            flexDirection={["column", "row"]}
            gap={2}
          >
            <Text variant="sm-display">Featured By:</Text>

            <Stack gap={2} flexDirection="row" flexWrap="wrap">
              {LOGOS.map(({ src, href, name, width, height }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    height={18}
                    src={src}
                    alt={name}
                    style={{
                      aspectRatio: `${width} / ${height}`,
                      ...(theme.name === "dark" && {
                        filter: "invert(1) hue-rotate(180deg)",
                      }),
                    }}
                    loading="lazy"
                  />
                </a>
              ))}
            </Stack>
          </Box>

          <Suspense fallback={<AboutPressShelfPlaceholder />}>
            <AboutPressShelf />
          </Suspense>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={["flex-start", "center"]}
            flexDirection={["column", "row"]}
            gap={2}
          >
            <Text variant={["sm-display", "lg-display"]}>
              Contact: <a href="mailto:press@artsy.net">press@artsy.net</a>
            </Text>

            <Button
              // @ts-ignore
              as={RouterLink}
              to="/press"
              variant="primaryBlack"
              onClick={() => {
                trackEvent({
                  action_type: DeprecatedAnalyticsSchema.ActionType.Click,
                  subject: "Visit Artsy Press Page",
                  destination_path: "/press",
                })
              }}
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
  href: string
  name: string
  width: number
  height: number
}[] = [
  {
    src: "https://files.artsy.net/images/logo-forbes.png",
    href: "https://www.forbes.com/sites/natalierobehmed/2013/09/06/why-artsy-is-succeeding-in-putting-the-art-world-online/",
    name: "Forbes",
    width: 148,
    height: 36,
  },
  {
    src: "https://files.artsy.net/images/logo-the-new-york-times.png",
    href: "https://www.nytimes.com/2018/01/26/arts/design/art-market-apps-magnus-artsy.html",
    name: "The New York Times",
    width: 388,
    height: 58,
  },
  {
    src: "https://files.artsy.net/images/logo-bloomberg.png",
    href: "https://www.bloomberg.com/news/articles/2018-03-27/new-york-s-artsy-is-making-it-even-easier-to-buy-art-online",
    name: "Bloomberg",
    width: 259,
    height: 54,
  },
  {
    src: "https://files.artsy.net/images/logo-fast-company.png",
    href: "https://www.fastcompany.com/40487205/by-harnessing-data-artsy-hopes-to-democratize-the-art-world",
    name: "Fast Company",
    width: 223,
    height: 41,
  },
]
