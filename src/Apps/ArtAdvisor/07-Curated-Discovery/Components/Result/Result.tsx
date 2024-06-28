import { Box, Join, Message, Spacer, Text } from "@artsy/palette"
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

      <Spacer y={2} />

      <Message borderRadius={4}>
        <Text>
          Your goal is: <strong>{state.goal}</strong>
        </Text>
        <Text>
          Your interests are:{" "}
          <strong>
            {[...state.interests, ...state.parsedInterests].join(", ")}
          </strong>
        </Text>
        {state.budgetIntent?.budget?.max ? (
          <Text>
            Your budget per artwork is:{" "}
            <strong>
              {state.budgetIntent?.numberOfArtworks
                ? (
                    state.budgetIntent.budget.max /
                    state.budgetIntent.numberOfArtworks
                  ).toFixed(0)
                : state.budgetIntent.budget.max}{" "}
              {state.budgetIntent.budget?.currency}
            </strong>
          </Text>
        ) : null}
        <Box mt={1}>
          Not correct? <Links dispatch={dispatch} />
        </Box>
      </Message>

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
