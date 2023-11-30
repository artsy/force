import { FC } from "react"
import { Text } from "@artsy/palette"

export const ConfirmationHeader: FC = () => {
  return (
    <>
      <Text variant="lg">Your alert has been saved.</Text>
      <Text variant="sm-display" color="black60">
        We’ll let you know when matching works are added to Artsy.
      </Text>
    </>
  )
}
