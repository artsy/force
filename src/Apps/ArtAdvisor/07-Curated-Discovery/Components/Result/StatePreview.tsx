import { Box } from "@artsy/palette"
import { State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { FC } from "react"

export const StatePreview: FC<{ state: State }> = ({ state }) => {
  return (
    <Box pt={4} mt={4} borderTop={"solid 1px"} borderColor={"black30"}>
      <details>
        <summary>State</summary>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </details>
    </Box>
  )
}
