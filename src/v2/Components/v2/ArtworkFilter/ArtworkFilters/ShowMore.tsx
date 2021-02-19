import { Clickable, Text } from "@artsy/palette"
import React, { useState } from "react"

interface ShowMoreProps {
  expanded?: boolean
}

export const ShowMore: React.FC<ShowMoreProps> = ({
  children,
  expanded = false,
}) => {
  const [isVisible, setVisible] = useState(expanded)

  return (
    <>
      {isVisible && children}

      <Clickable
        mt={1}
        textDecoration="underline"
        textAlign="left"
        onClick={() => setVisible(visibility => !visibility)}
      >
        <Text variant="small">{isVisible ? "Hide" : "Show more"}</Text>
      </Clickable>
    </>
  )
}
