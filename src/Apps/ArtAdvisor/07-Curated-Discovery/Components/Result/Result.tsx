import { Box, Join, Spacer, Text } from "@artsy/palette"
import { Action, State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { FC } from "react"
import { MarketingCollectionsRail } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollectionsRail"
import { Links } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/Links"
import { ArticlesRail } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArticlesRail"
import { ArtworksRail } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArtworksRail"
import { StatePreview } from "./StatePreview"

interface ResultProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Result: FC<ResultProps> = props => {
  const { state, dispatch } = props

  return (
    <Box>
      <Spacer y={4} />

      <Text as="h1" variant={"xl"}>
        Explore Artsy
      </Text>

      <Join separator={<Spacer y={6} />}>
        <Links dispatch={dispatch} />
        <StatePreview state={state} />
        <ArtworksRail state={state} />
        <MarketingCollectionsRail state={state} />
        <ArticlesRail state={state} />
      </Join>
    </Box>
  )
}
