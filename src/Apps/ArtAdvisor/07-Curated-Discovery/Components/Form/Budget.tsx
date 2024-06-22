import { Box, Spacer, Text, TextArea } from "@artsy/palette"
import { FC } from "react"
import { State, Action } from "Apps/ArtAdvisor/07-Curated-Discovery/App"

interface BudgetProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Budget: FC<BudgetProps> = props => {
  const { state, dispatch } = props

  return (
    <Box>
      <Text as="h2" variant={"lg"}>
        Describe your budget?
      </Text>

      <Spacer y={1} />

      <TextArea
        placeholder={
          "For example, “I will spend $500–$1,000 on this artwork,” or “I’d spend up to $100,000 this year on my collection.”"
        }
        defaultValue={state.budget}
        rows={2}
        onChange={e => {
          const text = e.value
          dispatch({ type: "SET_BUDGET", text })
        }}
      />
    </Box>
  )
}
