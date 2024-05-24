import { Box, Join, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "found"

import { STEPS, useArtworkFormContext } from "Apps/Sell/ArtworkFormContext"

export const StepsNavigation = () => {
  const { state } = useArtworkFormContext()
  const { match } = useRouter()

  return (
    <Box>
      <Join separator={<Spacer />}>
        {STEPS.map(step => (
          <RouterLink to={`/sell2/submissions/${match.params.id}/${step}`}>{state.currentStep === step ? ' > ' : null}{step}</RouterLink>
        ))}
      </Join>
    </Box>
  )
}
