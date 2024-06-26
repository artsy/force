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
import { useEffect, useState } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { AuthDialog } from "Components/AuthDialog/AuthDialog"

interface FormProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Form: React.FC<FormProps> = props => {
  const [isLoading, setIsLoading] = useState(false)
  const { state, dispatch } = props
  const { sendToast } = useToasts()
  const { user } = useSystemContext()

  useEffect(() => {
    if (!user) {
      return
    }

    const getWeaviateUser = () => {
      return fetch(`/api/advisor/7/users/${user.id}`)
    }

    const createWeaviateUser = () => {
      const headers = { "Content-Type": "application/json" }
      const body = JSON.stringify({ userId: user.id, name: user.name })
      const options = { method: "POST", headers, body }
      return fetch(`/api/advisor/7/users`, options)
    }

    getWeaviateUser().then(response => {
      if (response.status === 404) {
        console.log("Creating user in Weaviate", response)
        createWeaviateUser()
      }

      if (!response.ok) {
        throw new Error(
          `Error checking for weaviate user: ${response.statusText}`
        )
      }
    })
  }, [user])

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
      {!user && (
        <AuthDialog
          onClose={() => {
            /** noop */
          }}
        />
      )}

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
