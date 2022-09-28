import { Box } from "@artsy/palette"
import { useSystemContext } from "System"
import { FAQ } from "./Components"

export const FAQApp = () => {
  const { isEigen } = useSystemContext()

  const marginTop = isEigen ? -2 : 4

  return (
    <Box mt={marginTop} mb={4}>
      <FAQ />
    </Box>
  )
}
