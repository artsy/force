import {
  Box,
  Column,
  FullBleed,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { getFactsAndFigures } from "Utils/factsAndFigures"
import { cropped } from "Utils/resized"

export const SignupValueProps = () => {
  const { theme } = useTheme()

  return (
    <FullBleed bg="mono5" py={[6, 12]}>
      <AppContainer>
        <HorizontalPadding>
          <Text variant={"xl"} textAlign="center">
            Why Choose Artsy
          </Text>
          <Spacer y={4} />
          <GridColumns gridRowGap={4} gridColumnGap={[0, 4]}>
            {/* Card 1  */}
            <Column
              span={[12, 4]}
              bg="mono0"
              boxShadow={theme.effects.dropShadow}
            >
              <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
                <Image
                  {...cropped(
                    "https://files.artsy.net/images/rectangle-1.png",
                    {
                      width: 800,
                      height: 600,
                    },
                  )}
                  width="100%"
                  height="100%"
                  alt=""
                  lazyLoad
                />
              </ResponsiveBox>
              <Box px={2} pb={2}>
                <Text variant="lg-display" mt={2}>
                  The world’s largest online art marketplace
                </Text>
                <Text variant="sm" color="mono60" mt={1}>
                  Artsy is where collectors come to discover and buy original
                  art online. With works from{" "}
                  {getFactsAndFigures("galleriesCount")}+ gallery and auction
                  partners, the entire art world is waiting for you.
                </Text>
              </Box>
            </Column>

            {/* Card 2  */}
            <Column
              span={[12, 4]}
              bg="mono0"
              boxShadow={theme.effects.dropShadow}
            >
              <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
                <Image
                  {...cropped(
                    "https://files.artsy.net/images/rectangle-2.png",
                    {
                      width: 800,
                      height: 600,
                    },
                  )}
                  width="100%"
                  height="100%"
                  alt=""
                  lazyLoad
                />
              </ResponsiveBox>
              <Box px={2} pb={2}>
                <Text variant="lg-display" mt={2}>
                  Transparent art pricing and market data
                </Text>
                <Text variant="sm" color="mono60" mt={1}>
                  Make smarter collecting decisions with access to price
                  history, past auction results, and real-time market insights.
                  Know the value of a work before you buy it.
                </Text>
              </Box>
            </Column>

            {/* Card 3  */}
            <Column
              span={[12, 4]}
              bg="mono0"
              boxShadow={theme.effects.dropShadow}
            >
              <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
                <Image
                  {...cropped(
                    "https://files.artsy.net/images/rectangle-3.png",
                    {
                      width: 800,
                      height: 600,
                    },
                  )}
                  width="100%"
                  height="100%"
                  alt=""
                  lazyLoad
                />
              </ResponsiveBox>
              <Box px={2} pb={2}>
                <Text variant="lg-display" mt={2}>
                  Secure art buying, every time
                </Text>
                <Text variant="sm" color="mono60" mt={1}>
                  Shop with total confidence. Artsy’s trusted checkout and buyer
                  protections mean there’s no guesswork—just art you love,
                  delivered to your door. Learn more about the{" "}
                  <a href="/buyer-guarantee">Artsy Guarantee.</a>
                </Text>
              </Box>
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
