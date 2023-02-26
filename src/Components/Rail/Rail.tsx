import { Shelf, ShelfProps, Spacer } from "@artsy/palette"
import * as React from "react"
import { RailHeaderProps } from "./RailHeader"
import { RailHeader } from "./RailHeader"

interface RailProps extends RailHeaderProps {
  getItems(): JSX.Element[]
  alignItems?: ShelfProps["alignItems"]
  showProgress?: ShelfProps["showProgress"]
}

export const Rail: React.FC<RailProps> = ({
  getItems,
  alignItems = "flex-end",
  showProgress = true,
  ...railHeaderProps
}) => {
  return (
    <>
      <RailHeader {...railHeaderProps} />
      <Spacer y={4} />
      <Shelf alignItems={alignItems} showProgress={showProgress}>
        {React.Children.map(getItems(), (child, index) => {
          return <React.Fragment key={index}>{child}</React.Fragment>
        })}
      </Shelf>
    </>
  )
}
