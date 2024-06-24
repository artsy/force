import { Box, Join, Spacer } from "@artsy/palette"
import { Action, State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { FC } from "react"
import { MarketingCollectionsRail } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollectionsRail"
import { Links } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/Links"

interface ResultProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Result: FC<ResultProps> = props => {
  const { state, dispatch } = props

  return (
    <>
      <Links dispatch={dispatch} />
      <Join separator={<Spacer y={6} />}>
        <Box>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </Box>
        <MarketingCollectionsRail state={state} />
      </Join>
    </>
  )
}
