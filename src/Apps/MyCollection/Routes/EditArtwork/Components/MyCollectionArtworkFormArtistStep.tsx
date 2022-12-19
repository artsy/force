import { Avatar, Button, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
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
  const trimmedQuery = query.trimStart()

  const onSelect = ({ artistId, artistName }) => {
    setFieldValue("artistId", artistId)
    setFieldValue("artistName", artistName)
    onNext?.()
  }

  const onError = () => {
    console.log("error")
  }

  const onSkipPress = trimmedQuery => {
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
            onClick={() => onSkip?.()}
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
          console.log(value)
        }}
        onSelect={onSelect}
        placeholder="Search for artists on Artsy"
        title={""}
      />

      <Spacer y={2} />

      <Flex flexDirection="row">
        <Text variant="xs">Can't find the artist? &nbsp;</Text>
        <Clickable
          onClick={() => onSkipPress?.(trimmedQuery)}
          textDecoration="underline"
        >
          <Text variant="xs" color="black100">
            Add their name.
          </Text>
        </Clickable>
      </Flex>

      <Spacer y={4} />

      <Text variant="xs">Artists in My Collection</Text>

      <Spacer y={3} />

      {collectedArtists.map((artist, index) => {
        return (
          <Flex
            key={artist.internalID}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Clickable
              onClick={() =>
                onSelect({
                  artistId: artist.internalID,
                  artistName: artist.displayLabel,
                })
              }
            >
              <Avatar
                size="xs"
                src="https://picsum.photos/45/45"
                srcSet="https://picsum.photos/45/45 1x, https://picsum.photos/90/90 2x"
                lazyLoad
                initials="TK"
              />
              <Text variant="xs">{artist.displayLabel}</Text>
            </Clickable>
          </Flex>
        )
      })}

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

export const MyCollectionArtworkFormArtistStepFragmentContainer = createFragmentContainer(
  MyCollectionArtworkFormArtistStep,
  {
    me: graphql`
      fragment MyCollectionArtworkFormArtistStep_me on Me {
        myCollectionInfo {
          collectedArtistsConnection(first: 100) {
            edges {
              node {
                __typename
                displayLabel
                formattedNationalityAndBirthday
                imageUrl
                initials
                internalID
                isPersonalArtist
                slug
              }
            }
          }
        }
      }
    `,
  }
)
