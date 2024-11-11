import { FC } from "react"
import { useState } from "react"
import { Box, Flex, Text, Button, Image, ResponsiveBox } from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { InfiniteDiscoveryApp_artworks$data } from "__generated__/InfiniteDiscoveryApp_artworks.graphql"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { extractNodes } from "Utils/extractNodes"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { useSaveArtwork } from "Apps/ArtQuiz/Hooks/useSaveArtwork"

interface InfiniteDiscoveryAppProps {
  discoverArtworks: InfiniteDiscoveryApp_artworks$data
}

export const InfiniteDiscoveryApp: FC<InfiniteDiscoveryAppProps> = ({
  discoverArtworks,
}) => {
  const [started, setStarted] = useState(false)

  if (!discoverArtworks?.edges?.length) {
    return (
      <Flex flexDirection="column" bg="black100" p={2} marginTop={10}>
        <Text color="white100" fontSize="20px">
          Network issue - please reload the page :sad-rabbit:
        </Text>
      </Flex>
    )
  }

  const nodes = extractNodes(discoverArtworks)

  return (
    <>
      {!started && (
        <Flex flexDirection="column" bg="black100" p={2} marginTop={10}>
          <Flex flexDirection="row" justifyContent="space-between">
            <Text color="white100" fontSize="20px">
              Try <b>Discovery Mode</b> and browse new artworks tailored to you
            </Text>

            <Image
              src={
                "https://files.artsy.net/images/diamond-explore-by-flyer01.png"
              }
              width="250px"
              height="250px"
              lazyLoad
              alt=""
            />
          </Flex>
          <Flex flexDirection="column">
            <Box mt={1} p={2}>
              <Button variant="primaryWhite" onClick={() => setStarted(true)}>
                Start now
              </Button>
            </Box>
          </Flex>
        </Flex>
      )}
      {started && (
        <HeroCarousel fullBleed={false} progressbarVariant="dot">
          {nodes.map(artwork => {
            return (
              <DiscoverArtworkContainer key={artwork.id} artwork={artwork} />
            )
          })}
        </HeroCarousel>
      )}
    </>
  )
}

const DiscoverArtwork = ({ artwork }) => {
  const { submitMutation: submitSave } = useSaveArtwork()

  const onClick = () => {
    if (artwork.isSaved) {
      return submitSave({
        variables: {
          input: {
            artworkID: artwork.internalID,
            remove: true,
          },
        },
      })
    }

    return submitSave({
      variables: {
        input: {
          artworkID: artwork.internalID,
        },
      },
    })
  }

  return (
    <Flex
      width="100%"
      height="100%"
      flexDirection={["column-reverse", "row"]}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      key={artwork.id}
    >
      <Box alignItems="center" justifyContent="center" textAlign="center">
        <>
          <ResponsiveBox
            aspectWidth={500}
            aspectHeight={500}
            maxHeight={500}
            maxWidth={500}
          >
            <Image
              width="100%"
              height="100%"
              src={artwork.image?.url || undefined}
            />
          </ResponsiveBox>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex flexDirection="column" alignItems="flex-start">
              <Text variant="sm" fontWeight="bold">
                {artwork.title}
              </Text>
              <Text variant={["md", "lg-display"]} color="black60">
                {artwork.artist?.name}
                <div style={{ marginLeft: "10px", display: "inline-block" }}>
                  <SaveButtonBase
                    artwork={artwork}
                    isSaved={artwork.isSaved}
                    onClick={onClick}
                  />
                </div>
              </Text>
              <Flex alignSelf={"flex-end"}></Flex>
            </Flex>
          </Flex>
        </>
      </Box>
    </Flex>
  )
}

const DiscoverArtworkContainer = createFragmentContainer(DiscoverArtwork, {
  artwork: graphql`
    fragment InfiniteDiscoveryApp_artwork on Artwork {
      artist {
        name
      }
      title
      image {
        url(version: ["large"])
      }
      id
      internalID
      href
      slug
      isSaved
    }
  `,
})

export const InfiniteDiscoveryAppFragmentContainer = createFragmentContainer(
  InfiniteDiscoveryApp,
  {
    discoverArtworks: graphql`
      fragment InfiniteDiscoveryApp_artworks on ArtworkConnection {
        edges {
          node {
            id
            ...InfiniteDiscoveryApp_artwork
            internalID
            slug
            isDisliked
            isSaved
          }
        }
      }
    `,
  }
)
