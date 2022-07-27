import { Box, Flex, Text } from "@artsy/palette"
import { FC } from "react"
import { OnboardingFigure } from "../Components/OnboardingFigure"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"

export const OnboardingThankYou: FC = () => {
  return (
    <OnboardingSplitLayout
      left={
        <OnboardingFigure
          src="https://files.artsy.net/images/question-one-img.jpg"
          aspectWidth={1600}
          aspectHeight={2764}
          caption="Adegboyega Adesina, Painting of Rechel, 2021"
        />
      }
      right={
        <Flex flexDirection="column" justifyContent="space-between" p={4}>
          <Box width="100%">
            <Text variant="lg-display">Thank you! Now, get outta here!</Text>
          </Box>
        </Flex>
      }
    />
  )
}
