import { Shelf, Spacer } from "@artsy/palette"
import React from "react"
import { RailHeaderProps } from "."
import { RailHeader } from "./RailHeader"

interface RailProps extends RailHeaderProps {
  getItems(): JSX.Element[]
}

export const Rail: React.FC<RailProps> = ({ getItems, ...railHeaderProps }) => {
  return (
    <>
      <RailHeader {...railHeaderProps} />
      <Spacer mt={4} />
      <Shelf alignItems="flex-start">
        {React.Children.map(getItems(), (child, index) => {
          return <React.Fragment key={index}>{child}</React.Fragment>
        })}
      </Shelf>
    </>
  )
}
