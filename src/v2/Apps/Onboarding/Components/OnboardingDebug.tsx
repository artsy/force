import { Box, Flex, Button } from "@artsy/palette"
import { FC } from "react"
import { useMode } from "v2/Utils/Hooks/useMode"
import { useOnboardingContext } from "../useOnboardingContext"
import { OnboardingModal } from "./OnboardingModal"
import { OnboardingSteps } from "./OnboardingSteps"

export const OnboardingDebug: FC = () => {
  const {
    answers,
    current,
    progress,
    reset,
    workflowEngine,
  } = useOnboardingContext()

  const [mode, setMode] = useMode<"Resting" | "Modal">("Resting")
  return (
    <>
      <Box as="pre" bg="black5" p={1}>
        {JSON.stringify(
          {
            current,
            answers,
            position: `${workflowEngine.position()}/${workflowEngine.total()}`,
            progress: `${progress}%`,
          },
          null,
          2
        )}
      </Box>

      <Flex alignItems="center">
        <Button
          onClick={() => {
            setMode("Modal")
          }}
        >
          Open in modal
        </Button>

        <Button
          variant="secondaryBlack"
          ml={1}
          onClick={() => {
            reset()
          }}
        >
          Reset
        </Button>
      </Flex>

      {mode === "Modal" && (
        <OnboardingModal
          onClose={() => {
            setMode("Resting")
          }}
        >
          <OnboardingSteps />
        </OnboardingModal>
      )}
    </>
  )
}
