import { Button, Flex } from "@artsy/palette"
import { useArtworkFormContext } from "Apps/Consign/Routes/SubmissionFlow2/Components/ArtworkFormContext"

export const ArtworkFormNavigation: React.FC = () => {
  const { onBack, onNext } = useArtworkFormContext()

  return (
    <Flex p={2} width="100%" justifyContent="space-between">
      <Button variant="tertiary" onClick={onBack}>
        Back
      </Button>

      <Button variant="secondaryNeutral" onClick={onNext}>
        Continue
      </Button>
    </Flex>
  )
}
