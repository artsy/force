import {
  Box,
  Flex,
  Text,
  Spacer,
  Button,
  ArtsyMarkBlackIcon,
  FullBleed,
  ArtsyLogoIcon,
} from "@artsy/palette"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { SplitLayout } from "Components/SplitLayout"

export const ArtQuizWelcome = () => {
  const { desktop } = useNavBarHeight()

  return (
    <FullBleed height={`calc(100vh - ${desktop}px)`}>
      <Box height="100%" padding={0}>
        <SplitLayout
          hideLogo
          left={
            <Flex height="100%" alignItems="center" justifyContent="center">
              <ArtsyMarkBlackIcon height="65px" width="65px" fill="white100" />
            </Flex>
          }
          leftProps={{ display: ["none", "block"] }}
          right={
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              p={[2, 4]}
            >
              {/* Vertically centers next Box */}
              <Box />

              <Box width="100%">
                <ArtsyLogoIcon mb={2} />
                <Text variant={["xl", "xxl"]}>Art Taste Quiz</Text>

                <Spacer my={6} />

                <Text variant={["md", "lg-display"]}>
                  See more of what you love.
                  <Spacer my={4} />
                  Rate artworks to discover your taste profile and get
                  recommendations tailored to you.
                </Text>
              </Box>

              <Spacer my={1} />

              <Box width="100%">
                <Button width="100%">Start the Quiz</Button>
                <Button
                  variant="tertiary"
                  mt={1}
                  width="100%"
                  onClick={() => {
                    //redirect to home
                  }}
                >
                  Skip
                </Button>
              </Box>
            </Flex>
          }
        />
      </Box>
    </FullBleed>
  )
}
