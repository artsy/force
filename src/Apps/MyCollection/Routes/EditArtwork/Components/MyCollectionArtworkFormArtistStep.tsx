import {
  Box,
  Button,
  Clickable,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import {
  ArtistAutoComplete,
  AutocompleteArtist,
} from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtistAutocomplete"
import { useMyCollectionArtworkFormContext } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormHeader } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormHeader"
import { getMyCollectionArtworkFormInitialValues } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkFormHelpers"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArtworkFormArtistStep_me$key } from "__generated__/MyCollectionArtworkFormArtistStep_me.graphql"
import { useFormikContext } from "formik"
import { debounce, sortBy } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface MyCollectionArtworkFormArtistStepProps {
  me: MyCollectionArtworkFormArtistStep_me$key
}

export const MyCollectionArtworkFormArtistStep: React.FC<MyCollectionArtworkFormArtistStepProps> = ({
  me: meProp,
}) => {
  const me = useFragment(MyCollectionArtworkFormArtistStepFragment, meProp)

  const { onBack, onNext, onSkip } = useMyCollectionArtworkFormContext()
  const { setFieldValue, setValues } = useFormikContext<ArtworkModel>()
  const {
    trackSelectArtist,
    trackSkipArtistSelection,
  } = useMyCollectionTracking()

  const collectedArtists = sortBy(
    extractNodes(me?.myCollectionInfo?.collectedArtistsConnection),
    ["displayLabel"]
  )

  const [artistNotFound, setArtistNotFound] = useState(false)
  const [query, setQuery] = useState("")
  const trimmedQuery = query?.trimStart()

  const onSelect = (artist: AutocompleteArtist) => {
    trackSelectArtist()

    setFieldValue("artistId", artist?.internalID)
    setFieldValue("artistName", artist?.name || "")
    setFieldValue("artist", artist)

    if (!artist?.internalID) {
      setQuery("")

      return
    }

    // Skip the artwork step if the artist has no public artworks on Artsy or is a personal artist
    const skipNext = artist?.isPersonalArtist || artist?.counts?.artworks === 0

    onNext?.({ skipNext })
  }

  const onError = () => {
    console.log("error")
  }

  const handleSkip = () => {
    trackSkipArtistSelection()

    // Reset form values to initial values and set artist name
    setValues(getMyCollectionArtworkFormInitialValues(), false)
    setFieldValue("artistName", trimmedQuery)

    onSkip?.()
  }

  const handleArtistNotFound = useMemo(() => debounce(setArtistNotFound, 200), [
    setArtistNotFound,
  ])

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => handleArtistNotFound.cancel, [handleArtistNotFound])

  return (
    <AppContainer>
      <MyCollectionArtworkFormHeader onBackClick={() => onBack()} />

      <Spacer y={4} />

      <Text variant={["md", "lg-display"]}>Select an Artist</Text>

      <Spacer y={4} />

      <ArtistAutoComplete
        onError={onError}
        onChange={value => {
          setQuery(value)
          setFieldValue("artistName", value || "")
        }}
        onArtistNotFound={handleArtistNotFound}
        onSelect={onSelect}
        placeholder="Search for artists on Artsy"
      />

      <Spacer y={2} />

      {artistNotFound ? (
        <Box my={4}>
          <Text variant={["xs", "sm-display"]} flexWrap="wrap">
            We didn't find "
            <Text
              variant={["xs", "sm-display"]}
              display="inline-block"
              color="blue100"
            >
              {query}
            </Text>
            “ on Artsy. You can add their name in the artwork details.
          </Text>

          <Spacer y={4} />

          <Button width={300} variant="secondaryNeutral" onClick={handleSkip}>
            Add Artist
          </Button>
        </Box>
      ) : (
        <>
          <Flex flexDirection="row">
            <Text variant={["xs", "sm-display"]}>
              Can't find the artist?&nbsp;
              <Clickable
                onClick={handleSkip}
                textDecoration="underline"
                data-testid="artist-select-skip-button"
              >
                <Text variant={["xs", "sm-display"]} color="black100">
                  Add their name
                </Text>
              </Clickable>
              .
            </Text>
          </Flex>

          <Spacer y={4} />

          {collectedArtists.length > 0 && (
            <>
              <Text variant="sm-display">Artists in My Collection</Text>
              <Spacer y={1} />
              <GridColumns width="100%">
                {collectedArtists.map(artist => (
                  <Column span={[12, 4]} key={artist.internalID} mt={1}>
                    <Clickable
                      onClick={() => onSelect(artist as AutocompleteArtist)}
                      data-testid={`artist-${artist.internalID}`}
                    >
                      <EntityHeaderArtistFragmentContainer
                        artist={artist}
                        displayCounts={false}
                        displayLink={false}
                        displayFollowButton={false}
                      />
                    </Clickable>
                  </Column>
                ))}
              </GridColumns>
            </>
          )}
        </>
      )}

      <Spacer y={4} />
    </AppContainer>
  )
}

const MyCollectionArtworkFormArtistStepFragment = graphql`
  fragment MyCollectionArtworkFormArtistStep_me on Me {
    myCollectionInfo {
      collectedArtistsConnection(first: 100, includePersonalArtists: true) {
        edges {
          node {
            ...EntityHeaderArtist_artist
            counts {
              artworks
            }
            displayLabel
            formattedNationalityAndBirthday
            image {
              cropped(width: 45, height: 45) {
                src
                srcSet
              }
            }
            initials
            internalID
            isPersonalArtist
            name
            slug
            targetSupply {
              isP1
              isTargetSupply
            }
          }
        }
      }
    }
  }
`
