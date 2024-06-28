import { Box, Join, Spacer, Text } from "@artsy/palette"
import { Action, State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { FC } from "react"
import { MarketingCollectionsRail } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollectionsRail"
import { ArticlesRail } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArticlesRail"
import { ArtworksRail } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArtworksRail"
import { Header } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/Header"
import { StatePreview } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/StatePreview"

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

      <Spacer y={2} />

      <Header state={state} dispatch={dispatch} />

      <Spacer y={4} />

      <Join separator={<Spacer y={6} />}>
        <ArtworksRail state={state} />
        <MarketingCollectionsRail state={state} />
        <ArticlesRail state={state} />
      </Join>

      <StatePreview state={state} />
    </Box>
  )
}
