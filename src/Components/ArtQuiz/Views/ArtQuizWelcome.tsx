import { Box, Flex, Text, Spacer, Button } from "@artsy/palette"
import { OnboardingSplitLayout } from "Components/Onboarding/Components/OnboardingSplitLayout"
import { ArtQuizLeftPanel } from "../Components/ArtQuizLeftPanel"

export const ArtQuizWelcome = () => {
  return (
    <OnboardingSplitLayout
      left={<ArtQuizLeftPanel />}
      leftProps={{ display: "block" }}
      right={
        <Flex flexDirection="column" justifyContent="space-between" p={[2, 4]}>
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
            <Button variant="tertiary" mt={1} width="100%">
              Skip
            </Button>
          </Box>
        </Flex>
      }
    />
  )
}
