import { Box, Flex, Text } from "@artsy/palette"
import { FC, useEffect } from "react"
import { OnboardingFigure } from "../Components/OnboardingFigure"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"

export const OnboardingThankYou: FC = () => {
  const { onComplete } = useOnboardingContext()

  useEffect(() => {
    onComplete()
  }, [onComplete])

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
