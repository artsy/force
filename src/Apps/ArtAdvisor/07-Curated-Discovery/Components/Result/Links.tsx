import { Clickable, Flex } from "@artsy/palette"
import { Action } from "Apps/ArtAdvisor/07-Curated-Discovery/App"

interface LinksProps {
  dispatch: React.Dispatch<Action>
}

export const Links: React.FC<LinksProps> = props => {
  const { dispatch } = props
  return (
    <Flex gap={1}>
      <Clickable
        textDecoration={"underline"}
        py={1}
        onClick={() => dispatch({ type: "SET_STEP", step: "form" })}
      >
        Back
      </Clickable>
      <Clickable
        textDecoration={"underline"}
        py={1}
        onClick={() => dispatch({ type: "RESET" })}
      >
        Start over
      </Clickable>
    </Flex>
  )
}
