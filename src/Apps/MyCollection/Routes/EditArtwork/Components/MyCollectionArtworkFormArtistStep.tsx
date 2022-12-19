import { Button, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { useMyCollectionArtworkFormContext } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormHeader } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormHeader"

interface MyCollectionArtworkFormArtistStepProps {}

export const MyCollectionArtworkFormArtistStep: React.FC<MyCollectionArtworkFormArtistStepProps> = () => {
  const { onBack, onNext, onSkip } = useMyCollectionArtworkFormContext()

  return (
    <AppContainer>
      <MyCollectionArtworkFormHeader
        onBackClick={() => onBack()}
        NextButton={
          <Button
            width={[100, 300]}
            data-testid="artist-select-skip-button"
            onClick={() => onSkip?.()}
            size={["small", "large"]}
            variant="secondaryNeutral"
          >
            Skip
          </Button>
        }
      />

      <Spacer y={4} />

      {/* TODO: Implement screen */}

      <Text variant={"xl"}>Select Artist</Text>

      <Button
        width={300}
        onClick={() => onNext?.()}
        size="large"
        variant="secondaryNeutral"
        mt={4}
      >
        Next
      </Button>
    </AppContainer>
  )
}
