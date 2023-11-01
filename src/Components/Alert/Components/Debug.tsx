import { Box, Flex, Button } from "@artsy/palette"
import { FC } from "react"

import { Modal } from "Components/Alert/Components/Modal"
import { Steps } from "Components/Alert/Components/Steps"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { useMode } from "Utils/Hooks/useMode"

export const Debug: FC = () => {
  const { state, current, dispatch } = useAlertContext()

  const [mode, setMode] = useMode<"Resting" | "Modal">("Resting")
  return (
    <>
      <Box as="pre" bg="black5" p={1}>
        {JSON.stringify(
          {
            current,
            state,
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
            dispatch({ type: "RESET" })
          }}
        >
          Reset
        </Button>
      </Flex>

      {mode === "Modal" && (
        <Modal
          onClose={() => {
            setMode("Resting")
          }}
        >
          <Steps />
        </Modal>
      )}
    </>
  )
}
