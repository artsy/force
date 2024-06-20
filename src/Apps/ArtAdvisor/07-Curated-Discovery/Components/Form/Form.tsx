import { Box, Button, Flex, Join, Spacer, Text } from "@artsy/palette"
import { Interests } from "./Interests"
import { Goals } from "./Goals"
import { Budget } from "./Budget"
import { Action, State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"

interface FormProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Form: React.FC<FormProps> = props => {
  const { state, dispatch } = props
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

        <Button
          onClick={() => {
            dispatch({ type: "SET_STEP", step: "result" })
          }}
        >
          Show me things
        </Button>
      </Flex>
    </Box>
  )
}
