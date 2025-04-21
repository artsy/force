import { Box, Spacer } from "@artsy/palette"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { Debug } from "Components/Alert/Components/Debug"
import { Steps } from "Components/Alert/Components/Steps"
import type { FC } from "react"

export const AlertApp: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <AlertProvider initialCriteria={{ artistIDs: ["andy-warhol"] }}>
      <Debug />

      <Spacer y={2} />

      <Box border="1px dotted" borderColor="mono10">
        <Steps />
      </Box>
    </AlertProvider>
  )
}
