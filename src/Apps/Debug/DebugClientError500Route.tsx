import { Clickable, Text } from "@artsy/palette"
import { useState } from "react"

export const DebugClientError500Route = () => {
  const [error, setError] = useState(false)

  return (
    <>
      {error && (
        // @ts-expect-error
        // eslint-disable-next-line react/jsx-no-undef
        <Example />
      )}

      <Text mt={4} variant="sm-display">
        <Clickable
          textDecoration="underline"
          onClick={() => {
            setError(true)
          }}
        >
          Click to 500
        </Clickable>
      </Text>
    </>
  )
}
