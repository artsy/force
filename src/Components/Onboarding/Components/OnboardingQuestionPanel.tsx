import { Flex, Box, Button } from "@artsy/palette"
import { FC } from "react"
import { OnboardingProgress } from "./OnboardingProgress"

interface OnboardingQuestionPanelProps {
  disabled: boolean
  loading: boolean
  onNext(): void
}

export const OnboardingQuestionPanel: FC<OnboardingQuestionPanelProps> = ({
  disabled,
  loading,
  onNext,
  children,
}) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      p={4}
      width="100%"
    >
      <Flex
        flex={1}
        flexDirection="column"
        justifyContent={["flex-start", "space-between"]}
      >
        <OnboardingProgress preview={loading} />

        <Box width="100%" my={4}>
          {children}
        </Box>

        <Box />
      </Flex>

      <Button
        disabled={disabled}
        loading={loading}
        onClick={onNext}
        width="100%"
        minHeight={50}
      >
        Next
      </Button>
    </Flex>
  )
}
