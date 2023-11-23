import { Spacer, Text } from "@artsy/palette"
import { FC } from "react"

export const ConfirmationHeader: FC = () => {
  return (
    <>
      <Text variant="lg">Your alert has been saved.</Text>
      <Spacer y={1} />
      <Text variant="sm-display" color="black60">
        We’ll let you know when matching works are added to Artsy.
      </Text>
    </>
  )
}
