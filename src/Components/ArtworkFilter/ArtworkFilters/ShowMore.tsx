import { BoxProps, Clickable, Text } from "@artsy/palette"
import { Children, isValidElement, useState } from "react"
import * as React from "react"

interface ShowMoreProps extends BoxProps {
  initial?: number
  expanded?: boolean
}

export const INITIAL_ITEMS_TO_SHOW = 6

export const ShowMore: React.FC<ShowMoreProps> = ({
  initial = INITIAL_ITEMS_TO_SHOW,
  children,
  expanded = false,
  ...rest
}) => {
  const nodes = Children.toArray(children).filter(isValidElement)
  const hasMore = nodes.length > initial

  const [isExpanded, setExpanded] = useState(expanded)

  return (
    <>
      {isExpanded ? nodes : nodes.slice(0, initial)}

      {hasMore && (
        <Clickable
          // FIXME: Remove external margin
          mt={1}
          textDecoration="underline"
          textAlign="left"
          onClick={() => setExpanded(visibility => !visibility)}
          {...rest}
        >
          <Text variant="xs">{isExpanded ? "Hide" : "Show more"}</Text>
        </Clickable>
      )}
    </>
  )
}
