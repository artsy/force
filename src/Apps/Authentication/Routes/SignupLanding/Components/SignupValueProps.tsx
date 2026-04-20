import SearchIcon from "@artsy/icons/SearchIcon"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import TrendingIcon from "@artsy/icons/TrendingIcon"
import {
  Spacer,
  GridColumns,
  Column,
  Text,
  FullBleed,
  ResponsiveBox,
  Flex,
  Image,
  Box,
  useTheme,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

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
          <GridColumns gridRowGap={4}>
            {/* Card 1  */}
            <Column
              span={[12, 4]}
              bg="mono0"
              boxShadow={theme.effects.dropShadow}
            >
              <ResponsiveBox
                aspectWidth={4}
                aspectHeight={3}
                maxWidth="100%"
                bg="mono10"
              >
                <Image />
              </ResponsiveBox>
              <Box px={2} pb={2}>
                <Flex
                  width={48}
                  height={48}
                  borderRadius="50%"
                  bg="mono100"
                  alignItems="center"
                  justifyContent="center"
                  mt={2}
                >
                  <SearchIcon fill="mono0" />
                </Flex>

                <Text variant="lg-display" mt={2}>
                  The World's Largest Online Art Marketplace
                </Text>
                <Text variant="sm" color="mono60" mt={1}>
                  Artsy is where collectors come to discover and buy original
                  art online. With works from 3,100+ gallery and auction
                  partners — from New York to Seoul — the entire global art
                  market is at your fingertips.
                </Text>
              </Box>
            </Column>

            {/* Card 2  */}
            <Column
              span={[12, 4]}
              bg="mono0"
              boxShadow={theme.effects.dropShadow}
            >
              <ResponsiveBox
                aspectWidth={4}
                aspectHeight={3}
                maxWidth="100%"
                bg="mono10"
              >
                <Image />
              </ResponsiveBox>
              <Box px={2} pb={2}>
                <Flex
                  width={48}
                  height={48}
                  borderRadius="50%"
                  bg="mono100"
                  alignItems="center"
                  justifyContent="center"
                  mt={2}
                >
                  <TrendingIcon fill="mono0" />
                </Flex>

                <Text variant="lg-display" mt={2}>
                  Transparent Art Pricing and Market Data
                </Text>
                <Text variant="sm" color="mono60" mt={1}>
                  Make smarter collecting decisions with access to price
                  history, past auction results, and real-time market insights.
                  Know the value before you buy.
                </Text>
              </Box>
            </Column>

            {/* Card 3  */}
            <Column
              span={[12, 4]}
              bg="mono0"
              boxShadow={theme.effects.dropShadow}
            >
              <ResponsiveBox
                aspectWidth={4}
                aspectHeight={3}
                maxWidth="100%"
                bg="mono10"
              >
                <Image />
              </ResponsiveBox>
              <Box px={2} pb={2}>
                <Flex
                  width={48}
                  height={48}
                  borderRadius="50%"
                  bg="mono100"
                  alignItems="center"
                  justifyContent="center"
                  mt={2}
                >
                  <ShieldIcon fill="mono0" />
                </Flex>
                <Text variant="lg-display" mt={2}>
                  Secure Art Buying, Every Time
                </Text>
                <Text variant="sm" color="mono60" mt={1}>
                  Shop with total confidence. Artsy-trusted checkout and buyer
                  protections mean no guesswork - just art you love, delivered
                  to your door.{" "}
                  <a href="/buyer-guarantee">
                    Learn more about the Artsy Guarantee.
                  </a>
                </Text>
              </Box>
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
