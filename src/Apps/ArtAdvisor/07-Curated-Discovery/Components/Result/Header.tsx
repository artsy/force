import { FC } from "react"
import { Box, Message, Text } from "@artsy/palette"
import { Action, State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { Links } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/Links"

interface HeaderProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Header: FC<HeaderProps> = props => {
  const { state, dispatch } = props

  return (
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
  )
}
