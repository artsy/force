import { Box, Button, Flex } from "@artsy/palette"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { useMode } from "Utils/Hooks/useMode"
import type { FC } from "react"
import { OnboardingModal } from "./OnboardingModal"
import { OnboardingSteps } from "./OnboardingSteps"

export const OnboardingDebug: FC<React.PropsWithChildren<unknown>> = () => {
  const { state, current, progress, dispatch, workflowEngine } =
    useOnboardingContext()

  const [mode, setMode] = useMode<"Resting" | "Modal">("Resting")
  return (
    <>
      <Box as="pre" bg="mono5" p={1}>
        {JSON.stringify(
          {
            current,
            state,
            position: `${workflowEngine.position()}/${workflowEngine.total()}`,
            progress: `${progress}%`,
          },
          null,
          2,
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
            dispatch({ type: "RESET" })
          }}
        >
          Reset
        </Button>
      </Flex>

      {mode === "Modal" && (
        <OnboardingModal
          height={["100%", "90%"]}
          dialogProps={{ height: ["100%", "90%"] }}
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
