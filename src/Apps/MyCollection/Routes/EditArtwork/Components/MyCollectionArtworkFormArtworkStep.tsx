import {
  Box,
  Button,
  Clickable,
  EntityHeader,
  Spacer,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { useMyCollectionArtworkFormContext } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormHeader } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormHeader"
import ArtworkGrid from "Components/ArtworkGrid"
import { SearchInputContainer } from "Components/Search/SearchInputContainer"
import { MyCollectionArtworkFormArtworkStepQuery$data } from "__generated__/MyCollectionArtworkFormArtworkStepQuery.graphql"
import { useCallback, useState } from "react"
import { createRefetchContainer, graphql } from "react-relay"

interface MyCollectionArtworkFormArtworkStepProps {
  artworks: MyCollectionArtworkFormArtworkStepQuery$data
}

const artistID = "banksy"

export const MyCollectionArtworkFormArtworkStep: React.FC<MyCollectionArtworkFormArtworkStepProps> = ({
  artworks,
}) => {
  const { onBack, onNext, onSkip } = useMyCollectionArtworkFormContext()
  const [query, setQuery] = useState("")

  // useEffect(() => {
  //   console.log("relayEnvironment => ", relayEnvironment)

  //   fetchArtistArtworks(artistID, relayEnvironment!).then(artworks => {
  //     if (artworks?.artworksConnection) {
  //       setArtworks(artworks)
  //     }
  //   })
  // }, [relayEnvironment])

  const handleChange = useCallback(event => {
    setQuery(event.target.value)
  }, [])

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

      <Heeader />

      <Spacer y={4} />

      <SearchInputContainer
        value={query}
        onChange={handleChange}
        placeholder="Search for artworks"
      />

      <Spacer y={2} />

      <Text variant={["xs", "sm-display"]}>
        Or skip ahead to{" "}
        <Clickable onClick={() => onNext?.()} textDecoration="underline">
          <Text>add artwork details.</Text>
        </Clickable>
      </Text>

      <Spacer y={4} />

      <ArtworkGrid
        artworks={artworks.artworksConnection}
        columnCount={[2, 3]}
        itemMargin={40}
        emptyStateComponent={<SearchResultsNoResults />}
      />
    </AppContainer>
  )
}

const Heeader = () => {
  return (
    <>
      <Text variant={["md", "lg-display"]}>Select an Artwork</Text>

      <Spacer y={2} />

      <EntityHeader
        initials="FD"
        name="Francesca DiMattio"
        image={{
          src: "https://picsum.photos/30/30",
          srcSet:
            "https://picsum.photos/30/30 1x, https://picsum.photos/60/60 2x",
          lazyLoad: true,
        }}
        href="http://www.artsy.net/artist/francesca-dimattio"
        meta="American, b. 1979"
      />
    </>
  )
}

const SearchResultsNoResults = () => {
  const { onNext } = useMyCollectionArtworkFormContext()

  return (
    <Box>
      <Text variant={["xs", "sm-display"]} flexWrap="wrap">
        We couldn’t find a work named “
        <Text display="inline-block" color="blue100">
          Artttttttttt
        </Text>
        “
      </Text>

      <Spacer y={4} />

      <Button
        width={300}
        onClick={() => onNext?.()}
        size="large"
        variant="secondaryNeutral"
        mt={4}
      >
        Go to Add Artwork Details
      </Button>
    </Box>
  )
}

export const MyCollectionArtworkFormArtworkStepFragmentContainer = createRefetchContainer(
  MyCollectionArtworkFormArtworkStep,
  {
    artworks: graphql`
      fragment MyCollectionArtworkFormArtworkStep_FilterArtworksConnection on FilterArtworksConnection
        @argumentDefinitions(
          page: { type: "Int", defaultValue: 1 }
          artistID: { type: "String" }
        ) {
        counts {
          total
        }
        ...ArtworkGrid_artworks
        # }
      }
    `,
  },
  graphql`
    query MyCollectionArtworkFormArtworkStepQuery(
      $page: Int
      $artistID: String!
    ) {
      # filterArtworksConnection @arguments(page: $page, artistID: $artistID) {
      ...MyCollectionArtworkFormArtworkStep_FilterArtworksConnection
      # }
    }
  `
)
