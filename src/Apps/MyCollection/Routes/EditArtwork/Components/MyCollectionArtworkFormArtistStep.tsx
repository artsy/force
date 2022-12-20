import {
  Button,
  Clickable,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ArtistGridItemFragmentContainer } from "Apps/MyCollection/Routes/EditArtwork/Components/ArtistGridItem"
import { useMyCollectionArtworkFormContext } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormHeader } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormHeader"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { useFormikContext } from "formik"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArtworkFormArtistStep_me$data } from "__generated__/MyCollectionArtworkFormArtistStep_me.graphql"
import { ArtistAutoComplete } from "/Users/ole/artsy/force/src/Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtistAutocomplete"

interface MyCollectionArtworkFormArtistStepProps {
  me: MyCollectionArtworkFormArtistStep_me$data
}

export const MyCollectionArtworkFormArtistStep: React.FC<MyCollectionArtworkFormArtistStepProps> = ({
  me,
}) => {
  const { onBack, onNext, onSkip } = useMyCollectionArtworkFormContext()
  const { setFieldValue } = useFormikContext<ArtworkModel>()

  const collectedArtists = extractNodes(
    me?.myCollectionInfo?.collectedArtistsConnection
  )

  const [query, setQuery] = useState("")
  const trimmedQuery = query?.trimStart()

  const onSelect = ({ artistId, artistName }) => {
    setFieldValue("artistId", artistId)
    setFieldValue("artistName", artistName || "")

    if (!artistId) {
      setQuery("")

      return
    }

    onNext?.()
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
      <MyCollectionArtworkFormHeader
        onBackClick={() => onBack()}
        NextButton={
          <Button
            width={[100, 300]}
            data-testid="artist-select-skip-button"
            onClick={handleSkip}
            size={["small", "large"]}
            variant="secondaryNeutral"
          >
            Skip
          </Button>
        }
      />

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
        <Text variant="xs">Can't find the artist? &nbsp;</Text>
        <Clickable onClick={handleSkip} textDecoration="underline">
          <Text variant="xs" color="black100">
            Add their name.
          </Text>
        </Clickable>
      </Flex>

      <Spacer y={4} />

      <Text variant="xs">Artists in My Collection</Text>

      <Spacer y={1} />

      <GridColumns width="100%">
        {collectedArtists.map((artist, index) => (
          <Column span={[6, 4]} key={index}>
            <Clickable
              onClick={() =>
                onSelect({
                  artistId: artist.internalID,
                  artistName: artist.displayLabel,
                })
              }
              data-testid={`artist-${artist.internalID}`}
            >
              <ArtistGridItemFragmentContainer artist={artist} />
            </Clickable>
          </Column>
        ))}
      </GridColumns>
    </AppContainer>
  )
}

export const MyCollectionArtworkFormArtistStepFragmentContainer = createFragmentContainer(
  MyCollectionArtworkFormArtistStep,
  {
    me: graphql`
      fragment MyCollectionArtworkFormArtistStep_me on Me {
        myCollectionInfo {
          collectedArtistsConnection(first: 100) {
            edges {
              node {
                ...ArtistGridItem_artist
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
    `,
  }
)
