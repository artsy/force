import { FC } from "react"
import { Spacer, Box } from "@artsy/palette"
import { ArtworkAlertProvider } from "Components/ArtworkAlert/Hooks/useArtworkAlertContext"
import { Debug } from "Components/ArtworkAlert/Components/Debug"
import { Steps } from "Components/ArtworkAlert/Components/Steps"

export const ArtworkAlertApp: FC = () => {
  return (
    <ArtworkAlertProvider initialCriteria={{ artistIDs: ["andy-warhol"] }}>
      <Debug />

      <Spacer y={2} />

      <Box border="1px dotted" borderColor="black10">
        <Steps />
      </Box>
    </ArtworkAlertProvider>
  )
}
