import { Box } from "@artsy/palette"
import { useArtworkFormContext } from "Apps/Sell/ArtworkFormContext"
import { useFormikContext } from "formik"

export const DevDebug: React.FC = () => {
  const { state } = useArtworkFormContext()
  const { values } = useFormikContext()

  if (state.currentStep === "thank-you") return null

  return (
    <>
      <Box border="1px solid" p={2} my={2}>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Box>
      <Box border="1px solid" p={2} my={2}>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Box>
    </>
  )
}
