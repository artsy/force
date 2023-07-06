import {
  Button,
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
import { getMyCollectionArtworkFormInitialValues } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkFormHelpers"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { SearchInputContainer } from "Components/Search/SearchInputContainer"
import { useFormikContext } from "formik"
import { pickBy } from "lodash"
import { Suspense, useCallback, useState } from "react"

interface MyCollectionArtworkFormArtworkStepProps {}

export const MyCollectionArtworkFormArtworkStep: React.FC<MyCollectionArtworkFormArtworkStepProps> = () => {
  const {
    trackSelectArtwork,
    trackSkipArtworkSelection,
  } = useMyCollectionTracking()
  const { onBack, onNext, onSkip } = useMyCollectionArtworkFormContext()
  const [query, setQuery] = useState("")
  const trimmedQuery = query?.trimStart()

  const handleChange = useCallback(event => {
    setQuery(event.target.value)
  }, [])

  const handleSkip = () => {
    trackSkipArtworkSelection()

    setFieldValue("title", trimmedQuery)

    onSkip?.()
  }

  const { values, setFieldValue, setValues } = useFormikContext<ArtworkModel>()

  const initializezFormValues = artwork => {
    // Initialize main form values with artwork data

    const filteredFormValues = omit(
      pickBy(artwork, value => value !== null),
      ["images"]
    )

    Object.entries(filteredFormValues).forEach(([key, value]) => {
      setFieldValue(key, value)
    })

    // Initialize photos with artwork images

    const photos = artwork.images?.map(image => {
      return {
        name: "Automatically added",
        url: image.url,
        id: image?.internalID,
        size: image?.width,
      }
    })

    setFieldValue("newPhotos", photos)
  }

  const handleArtworkClick = artwork => {
    trackSelectArtwork()

    initializezFormValues(artwork)

    onNext?.()
  }

  const handleBack = () => {
    // Reset form values to initial values
    setValues(getMyCollectionArtworkFormInitialValues(), false)

    onBack()
  }

  return (
    <AppContainer>
      <MyCollectionArtworkFormHeader
        onBackClick={handleBack}
        NextButton={
          <Button
            width={[100, 300]}
            data-testid="artwork-select-skip-button"
            onClick={handleSkip}
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

      <Suspense fallback={<Spinner />}>
        <MyCollectionArworkSearch
          artistId={values.artistId}
          query={trimmedQuery}
          onClick={handleArtworkClick}
          onSkip={handleSkip}
        />
      </Suspense>
    </AppContainer>
  )
}
