import { Box } from "@artsy/palette"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useFormikContext } from "formik"

export const DevDebug: React.FC = () => {
  const context = useSellFlowContext()
  const formik = useFormikContext()

  if (!context?.state?.devMode) return null

  return (
    <>
      {context?.state && (
        <Box border="1px solid" p={2} my={2}>
          <pre>{JSON.stringify(context.state, null, 2)}</pre>
        </Box>
      )}
      {formik && (
        <Box border="1px solid" p={2} my={2}>
          <pre>
            {JSON.stringify(
              {
                errors: formik.errors,
                values: formik.values,
                isValid: formik.isValid,
                isSubmitting: formik.isSubmitting,
                isValidating: formik.isValidating,
                dirty: formik.dirty,
              },
              null,
              2
            )}
          </pre>
        </Box>
      )}
    </>
  )
}
