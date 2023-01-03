import {
  Clickable,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ArtistAutoComplete } from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtistAutocomplete"
import { useMyCollectionArtworkFormContext } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormHeader } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormHeader"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { useFormikContext } from "formik"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArtworkFormArtistStep_me$key } from "__generated__/MyCollectionArtworkFormArtistStep_me.graphql"

interface MyCollectionArtworkFormArtistStepProps {
  me: MyCollectionArtworkFormArtistStep_me$key
}

export const MyCollectionArtworkFormArtistStep: React.FC<MyCollectionArtworkFormArtistStepProps> = ({
  me: meProp,
}) => {
  const me = useFragment(MyCollectionArtworkFormArtistStepFragment, meProp)

  const { onBack, onNext, onSkip } = useMyCollectionArtworkFormContext()
  const { setFieldValue } = useFormikContext<ArtworkModel>()

  const collectedArtists = extractNodes(
    me?.myCollectionInfo?.collectedArtistsConnection
  )

  const [query, setQuery] = useState("")
  const trimmedQuery = query?.trimStart()

  const onSelect = artist => {
    setFieldValue("artistId", artist.internalID)
    setFieldValue("artistName", artist.name || "")
    setFieldValue("artist", artist)

    if (!artist.internalID) {
      setQuery("")

      return
    }

    // Skip the artwork step if the artist has no public artworks on Artsy or is a personal artist
    const skipNext = artist.isPersonalArtist || artist.counts.artworks === 0

    onNext?.({ skipNext })
  }

  const onError = () => {
    console.log("error")
  }

  const handleSkip = () => {
    setFieldValue("artistId", undefined)
    setFieldValue("artistName", trimmedQuery)

    onSkip?.()
  }

  return (
    <AppContainer>
      <MyCollectionArtworkFormHeader onBackClick={() => onBack()} />

      <Spacer y={4} />

      <Text variant={"lg"}>Select an Artist</Text>

      <Spacer y={4} />

      <ArtistAutoComplete
        onError={onError}
        onChange={value => {
          setQuery(value)
          setFieldValue("artistName", value || "")
        }}
        onSelect={onSelect}
        placeholder="Search for artists on Artsy"
      />

      <Spacer y={2} />

      <Flex flexDirection="row">
        <Text variant="sm-display">
          Can't find the artist?&nbsp;
          <Clickable
            onClick={handleSkip}
            textDecoration="underline"
            data-testid="artist-select-skip-button"
          >
            <Text variant="sm-display" color="black100">
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
              <Column span={[6, 4]} key={artist.internalID} mt={1}>
                <Clickable
                  onClick={() => onSelect(artist)}
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
    </AppContainer>
  )
}

const MyCollectionArtworkFormArtistStepFragment = graphql`
  fragment MyCollectionArtworkFormArtistStep_me on Me {
    myCollectionInfo {
      collectedArtistsConnection(first: 100) {
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
          }
        }
      }
    }
  }
`
