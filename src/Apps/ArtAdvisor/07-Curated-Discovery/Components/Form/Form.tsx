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
import { useRouter } from "System/Hooks/useRouter"
import { StatePreview } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/StatePreview"
import _ from "lodash"

interface FormProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Form: React.FC<FormProps> = props => {
  const [isLoading, setIsLoading] = useState(false)
  const { state, dispatch } = props
  const { sendToast } = useToasts()
  const { user } = useSystemContext()
  const { router } = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace("/login?redirectTo=/advisor/7")
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
  }, [user, router])

  const handleSubmit = async () => {
    try {
      if (_.isEmpty(state.goal)) {
        sendToast({
          variant: "error",
          message: "Please select a goal",
          ttl: 2000,
        })
        return
      }
      if (_.isEmpty(state.interests)) {
        sendToast({
          variant: "error",
          message: "Please select some interests",
          ttl: 2000,
        })
        return
      }

      setIsLoading(true)
      await extractBudgetIntent(state, dispatch)
      await extractInterestsIntent(state, dispatch)
      dispatch({ type: "SET_STEP", step: "result" })
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
        Explore Artsy
      </Text>

      <Spacer y={4} />

      <Join separator={<Spacer y={4} />}>
        <Goals state={state} dispatch={dispatch} />
        <Budget state={state} dispatch={dispatch} />
        <Interests state={state} dispatch={dispatch} />
      </Join>

      <Spacer y={4} />

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

      <StatePreview state={state} />
    </Box>
  )
}

async function extractBudgetIntent(
  state: State,
  dispatch: React.Dispatch<Action>
) {
  const params = new URLSearchParams({ budget: state.budget })
  const url = `/api/advisor/7/budget/intent?${params.toString()}`
  const headers = { "Content-Type": "application/json" }
  const options = { headers }
  const budgetIntent = await fetch(url, options)

  if (budgetIntent.ok) {
    const intent = (await budgetIntent.json()) as BudgetIntent
    dispatch({ type: "SET_BUDGET_INTENT", intent })
  } else {
    console.warn(
      "Could not infer budget from",
      state.budget,
      budgetIntent.statusText
    )
  }
}

async function extractInterestsIntent(
  state: State,
  dispatch: React.Dispatch<Action>
) {
  const params = new URLSearchParams({
    interestsFreeText: state.interestsFreeText,
  })
  const url = `/api/advisor/7/interests/intent?${params.toString()}`
  const headers = { "Content-Type": "application/json" }
  const options = { headers }
  const interestIntent = await fetch(url, options)

  if (interestIntent.ok) {
    const parsedInterests = (await interestIntent.json()) as string[]
    dispatch({ type: "SET_PARSED_INTERESTS", interests: parsedInterests })
  } else {
    console.warn(
      "Could not infer interests from",
      state.interestsFreeText,
      interestIntent.statusText
    )
  }
}
