import { Box, Clickable } from "@artsy/palette"
import { Action } from "Apps/ArtAdvisor/07-Curated-Discovery/App"

interface LinksProps {
  dispatch: React.Dispatch<Action>
}

export const Links: React.FC<LinksProps> = props => {
  const { dispatch } = props
  return (
    <Box display={"inline-block"}>
      <Clickable
        textDecoration={"underline"}
        py={1}
        onClick={() => dispatch({ type: "SET_STEP", step: "form" })}
      >
        Update your answers
      </Clickable>{" "}
      or{" "}
      <Clickable
        textDecoration={"underline"}
        py={1}
        onClick={() => dispatch({ type: "RESET" })}
      >
        start over
      </Clickable>
    </Box>
  )
}
