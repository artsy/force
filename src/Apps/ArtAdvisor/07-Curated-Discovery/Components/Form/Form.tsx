import {
  Box,
  Button,
  Flex,
  Join,
  Spacer,
  Spinner,
  Text,
  useToasts,
} from "@artsy/palette"
import { Interests } from "./Interests"
import { Goals } from "./Goals"
import { Budget } from "./Budget"
import {
  Action,
  BudgetIntent,
  State,
} from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { useState } from "react"

interface FormProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Form: React.FC<FormProps> = props => {
  const [isLoading, setIsLoading] = useState(false)
  const { state, dispatch } = props
  const { sendToast } = useToasts()

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({ budget: state.budget })
      const url = `/api/advisor/7/budget/intent?${params.toString()}`
      const headers = { "Content-Type": "application/json" }
      const options = { headers }
      const budgetIntent = await fetch(url, options)

      if (budgetIntent.ok) {
        const intent = (await budgetIntent.json()) as BudgetIntent
        dispatch({ type: "SET_BUDGET_INTENT", intent })
        dispatch({ type: "SET_STEP", step: "result" })
      } else {
        sendToast({
          variant: "error",
          message: `Could not infer budget: ${
            budgetIntent.statusText
          } (Input: ${state.budget || "missing"})`,
        })
      }
    } catch (error) {
      console.error(error)
      sendToast({
        variant: "error",
        message: JSON.stringify(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box>
      <Spacer y={4} />

      <Text as="h1" variant={"xl"}>
        Discover Blah
      </Text>

      <Join separator={<Spacer y={2} />}>
        <Goals state={state} dispatch={dispatch} />
        <Budget state={state} dispatch={dispatch} />
        <Interests state={state} dispatch={dispatch} />
      </Join>

      <Spacer y={2} />

      <Flex gap={1}>
        <Button
          variant={"secondaryBlack"}
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </Button>

        <Button onClick={handleSubmit} minWidth={"13em"}>
          {isLoading ? <Spinner color={"white"} /> : "Show me things"}
        </Button>
      </Flex>
    </Box>
  )
}
