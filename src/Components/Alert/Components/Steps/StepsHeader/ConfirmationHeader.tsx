import { Text } from "@artsy/palette"
import type { FC } from "react"

export const ConfirmationHeader: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <Text variant="lg">Your alert has been saved.</Text>
      <Text variant="sm-display" color="black60">
        We’ll let you know when matching works are added to Artsy.
      </Text>
    </>
  )
}
