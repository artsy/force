import { Clickable, Text } from "@artsy/palette"
import React, { Children, isValidElement, useState } from "react"

interface ShowMoreProps {
  initial: number
  expanded?: boolean
  children: JSX.Element[]
}

export const ShowMore: React.FC<ShowMoreProps> = ({
  initial,
  children,
  expanded = false,
}) => {
  const nodes = Children.toArray(children).filter(isValidElement)

  const [isExpanded, setExpanded] = useState(expanded)

  return (
    <>
      {isExpanded ? nodes : nodes.slice(0, initial)}

      <Clickable
        mt={1}
        textDecoration="underline"
        textAlign="left"
        onClick={() => setExpanded(visibility => !visibility)}
      >
        <Text variant="small">{isExpanded ? "Hide" : "Show more"}</Text>
      </Clickable>
    </>
  )
}
