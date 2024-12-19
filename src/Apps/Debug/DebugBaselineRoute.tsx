import { Text } from "@artsy/palette"
import type * as React from "react"
import { Title } from "react-head"

export const DebugBaselineRoute: React.FC<React.PropsWithChildren<{}>> = () => {
  return (
    <>
      <Title>Baseline</Title>

      <Text variant="sm-display">Baseline</Text>
    </>
  )
}
