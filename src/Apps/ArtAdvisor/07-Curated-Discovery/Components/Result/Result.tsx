import { Box } from "@artsy/palette"
import { Action, State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { FC } from "react"

interface ResultProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Result: FC<ResultProps> = props => {
  const { state } = props

  return (
    <Box>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Box>
  )
}
