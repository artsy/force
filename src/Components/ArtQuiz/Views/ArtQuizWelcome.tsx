import {
  Box,
  Flex,
  Text,
  Spacer,
  Button,
  ArtsyMarkBlackIcon,
} from "@artsy/palette"
import { SplitLayout } from "Components/SplitLayout"

export const ArtQuizWelcome = () => {
  return (
    <Box height="100%" width="100%" padding={0}>
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
              <Text variant={["xl", "xxl"]}>Art Curator Quiz</Text>

              <Spacer mt={[2, 4]} />

              <Text variant={["md", "lg-display"]}>
                See more of what you love.
                <Spacer my={1} />
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
  )
}
