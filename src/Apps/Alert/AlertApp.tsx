import { FC } from "react"
import { Spacer, Box } from "@artsy/palette"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { Debug } from "Components/Alert/Components/Debug"
import { Steps } from "Components/Alert/Components/Steps"

export const AlertApp: FC = () => {
  return (
    <AlertProvider initialCriteria={{ artistIDs: ["andy-warhol"] }}>
      <Debug />

      <Spacer y={2} />

      <Box border="1px dotted" borderColor="black10">
        <Steps />
      </Box>
    </AlertProvider>
  )
}
