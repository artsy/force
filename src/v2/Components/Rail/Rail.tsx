import { Shelf, ShelfProps, Spacer } from "@artsy/palette"
import React from "react"
import { RailHeaderProps } from "."
import { RailHeader } from "./RailHeader"

interface RailProps extends RailHeaderProps {
  getItems(): JSX.Element[]
  alignItems?: ShelfProps["alignItems"]
}

export const Rail: React.FC<RailProps> = ({
  getItems,
  alignItems = "flex-end",
  ...railHeaderProps
}) => {
  return (
    <>
      <RailHeader {...railHeaderProps} />
      <Spacer mt={4} />
      <Shelf alignItems={alignItems}>
        {React.Children.map(getItems(), (child, index) => {
          return <React.Fragment key={index}>{child}</React.Fragment>
        })}
      </Shelf>
    </>
  )
}
