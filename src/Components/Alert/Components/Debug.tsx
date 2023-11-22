import { Box, Flex, Button, Select } from "@artsy/palette"
import { FC } from "react"

import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

const ARTIST_OPTIONS = [
  {
    value: "andy-warhol",
    text: "Andy Warhol",
  },
  {
    value: "damien-hirst",
    text: "Damien Hirst",
  },
]

export const Debug: FC = () => {
  const { state, current, dispatch } = useAlertContext()

  return (
    <>
      <Box as="pre" bg="black5" p={1}>
        {JSON.stringify(
          {
            current,
            state,
          },
          null,
          2
        )}
      </Box>

      <Flex alignItems="center">
        <Button
          onClick={() => {
            dispatch({ type: "SHOW" })
          }}
        >
          Open in modal
        </Button>

        <Button
          variant="secondaryBlack"
          ml={1}
          onClick={() => {
            dispatch({ type: "RESET" })
          }}
        >
          Reset
        </Button>
        <Select
          title="Artist"
          selected={state.criteria.artistIDs?.[0]}
          options={ARTIST_OPTIONS}
          onSelect={(artistID: string) => {
            dispatch({
              type: "SET_CRITERIA_ATTRIBUTE",
              payload: { key: "artistIDs", value: [artistID] },
            })
          }}
          width={200}
          pl={2}
        />
      </Flex>
    </>
  )
}
