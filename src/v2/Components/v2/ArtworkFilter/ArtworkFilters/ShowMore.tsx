import { Clickable, Text } from "@artsy/palette"
import React, { Children, isValidElement, useState } from "react"

interface ShowMoreProps {
  initial?: number
  expanded?: boolean
  children: JSX.Element[]
}

const INITIAL_ITEMS_TO_SHOW = 6

export const ShowMore: React.FC<ShowMoreProps> = ({
  initial = INITIAL_ITEMS_TO_SHOW,
  children,
  expanded = false,
}) => {
  const nodes = Children.toArray(children).filter(isValidElement)
  const hasMore = nodes.length > initial

  const [isExpanded, setExpanded] = useState(expanded)

  return (
    <>
      {isExpanded ? nodes : nodes.slice(0, initial)}

      {hasMore && (
        <Clickable
          mt={1}
          textDecoration="underline"
          textAlign="left"
          onClick={() => setExpanded(visibility => !visibility)}
        >
          <Text variant="small">{isExpanded ? "Hide" : "Show more"}</Text>
        </Clickable>
      )}
    </>
  )
}
