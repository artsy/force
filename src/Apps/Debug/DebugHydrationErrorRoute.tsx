import { Text } from "@artsy/palette"
import { Title } from "react-head"

export const DebugHydrationErrorRoute = () => {
  return (
    <>
      <Title>Hydration Error</Title>

      <Text variant="sm-display">Hydration Error</Text>

      <HydrationMismatch />
    </>
  )
}

const HydrationMismatch = () => {
  if (typeof window === "undefined") {
    return null
  }

  return <div>HydrationMismatch</div>
}
