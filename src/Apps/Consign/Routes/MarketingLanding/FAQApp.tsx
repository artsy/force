import { Box } from "@artsy/palette"
import { FAQ } from "Apps/Consign/Routes/MarketingLanding/Components/FAQ"
import { useSystemContext } from "System/useSystemContext"

export const FAQApp = () => {
  const { isEigen } = useSystemContext()

  const marginTop = isEigen ? -2 : 4

  return (
    <Box mt={marginTop} mb={4}>
      <FAQ />
    </Box>
  )
}
