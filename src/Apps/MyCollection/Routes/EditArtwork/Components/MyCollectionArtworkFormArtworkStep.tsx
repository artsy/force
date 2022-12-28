import {
  Button,
  Clickable,
  EntityHeader,
  omit,
  Spacer,
  Spinner,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { useMyCollectionArtworkFormContext } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormHeader } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormHeader"
import { MyCollectionArworkSearch } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArworkSearch"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { SearchInputContainer } from "Components/Search/SearchInputContainer"
import { useFormikContext } from "formik"
import { pickBy } from "lodash"
import { Suspense, useCallback, useState } from "react"

interface MyCollectionArtworkFormArtworkStepProps {}

export const MyCollectionArtworkFormArtworkStep: React.FC<MyCollectionArtworkFormArtworkStepProps> = () => {
  const { onBack, onNext, onSkip } = useMyCollectionArtworkFormContext()
  const [query, setQuery] = useState("")

  const handleChange = useCallback(event => {
    setQuery(event.target.value)
  }, [])

  const { values, setFieldValue } = useFormikContext<ArtworkModel>()

  const handleArtworkClick = artwork => {
    const filteredFormValues = omit(
      pickBy(artwork, value => value !== null),
      ["images"]
    )

    Object.entries(filteredFormValues).forEach(([key, value]) => {
      setFieldValue(key, value)
    })

    onNext?.()
  }

  return (
    <AppContainer>
      <MyCollectionArtworkFormHeader
        onBackClick={() => onBack()}
        NextButton={
          <Button
            width={[100, 300]}
            data-testid="artwork-select-skip-button"
            onClick={() => onSkip?.()}
            size={["small", "large"]}
            variant="secondaryNeutral"
          >
            Skip
          </Button>
        }
      />

      <Spacer y={4} />

      <Text variant={["md", "lg-display"]}>Select an Artwork</Text>

      <Spacer y={2} />

      <EntityHeader
        name={values.artist?.name || ""}
        meta={values.artist?.formattedNationalityAndBirthday || ""}
        initials={values.artist?.initials || ""}
        image={values.artist?.image?.cropped!}
      />

      <Spacer y={4} />

      <SearchInputContainer
        value={query}
        onChange={handleChange}
        placeholder="Search for artworks"
      />

      <Spacer y={2} />

      <Text variant={["xs", "sm-display"]}>
        Or skip ahead to{" "}
        <Clickable onClick={() => onSkip?.()} textDecoration="underline">
          <Text>add artwork details.</Text>
        </Clickable>
      </Text>

      <Spacer y={4} />

      <Suspense fallback={() => <Spinner />}>
        <MyCollectionArworkSearch
          artistId={values.artistId}
          query={query}
          onClick={handleArtworkClick}
        />
      </Suspense>
    </AppContainer>
  )
}
