import { Box, Image, Spacer, Text } from "@artsy/palette"
import { useArtistHeaderPalette } from "Apps/Artist/Components/ArtistHeader/useArtistHeaderPalette"
import { FC, useEffect } from "react"
import { graphql } from "react-relay"
import styled from "styled-components"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useTransition } from "Utils/Hooks/useTransition"
import { wait } from "Utils/wait"
import { RetrospectiveTopArtistQuery } from "__generated__/RetrospectiveTopArtistQuery.graphql"

interface RetrospectiveTopArtistProps {
  data: [string, number][]
}

export const RetrospectiveTopArtist: FC<RetrospectiveTopArtistProps> = ({
  data: datums,
}) => {
  const [[slug, count]] = datums

  const { data, loading } = useClientQuery<RetrospectiveTopArtistQuery>({
    query: graphql`
      query RetrospectiveTopArtistQuery($id: String!) {
        artist(id: $id) {
          slug
          name
          iconicArtworks: artworksConnection(first: 1, sort: ICONICITY_DESC) {
            edges {
              node {
                dominantColors
                image {
                  resized(
                    width: 800
                    height: 800
                    version: ["normalized", "larger", "large"]
                  ) {
                    width
                    height
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      id: slug,
    },
  })

  const artist = data?.artist
  const image = artist?.iconicArtworks?.edges?.[0]?.node?.image?.resized
  const dominantColors =
    artist?.iconicArtworks?.edges?.[0]?.node?.dominantColors ?? []
  const [dominantColor] = dominantColors

  const {
    backgroundColor,
    foregroundColor,
    secondaryColor,
  } = useArtistHeaderPalette(dominantColor ?? "#000000")

  const { transition, register } = useTransition({
    initialStatus: "Out",
    duration: 1000,
  })

  useEffect(() => {
    const init = async () => {
      await wait(500)
      transition("In")
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
    document.body.style.color = foregroundColor

    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.color = ""
    }
  }, [backgroundColor, foregroundColor])

  if (loading) {
    return null
  }

  return (
    <Box
      color={foregroundColor}
      m="auto"
      width="fit-content"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {image && (
        <Box position="relative">
          <Img ref={register(2)} data-state="Out">
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width={image.width}
              height={image.height}
              lazyLoad
              alt=""
            />
          </Img>

          <Img
            ref={register(0)}
            position="absolute"
            bottom={-20}
            left={-20}
            width="100%"
            height="100%"
            zIndex={-1}
            bg={dominantColors[1]}
            data-state="Out"
            style={{ mixBlendMode: "difference" }}
          />

          <Img
            ref={register(1)}
            position="absolute"
            bottom={-10}
            left={-10}
            width="100%"
            height="100%"
            zIndex={-1}
            bg={dominantColors[2]}
            data-state="Out"
            style={{ mixBlendMode: "difference" }}
          />
        </Box>
      )}

      <Spacer y={4} />

      <Box width={image?.width} style={{ mixBlendMode: "difference" }}>
        <Title variant="xxl" ref={register(3)} data-state="Out">
          Your Top Artist
        </Title>

        <Description
          variant="xxl"
          color={secondaryColor}
          ref={register(4)}
          data-state="Out"
        >
          You saved {count} artworks by {artist?.name}
        </Description>
      </Box>
    </Box>
  )
}

const Img = styled(Box)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="Out"] {
    opacity: 0;
    transform: scale(0.9);
  }

  &[data-state="In"] {
    opacity: 1;
    transform: scale(1);
  }
`

const Title = styled(Text)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="Out"] {
    opacity: 0;
    transform: translateX(-2em);
  }

  &[data-state="In"] {
    opacity: 1;
    transform: translateX(0);
  }
`

const Description = styled(Text)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="Out"] {
    opacity: 0;
    transform: translateX(2em);
  }

  &[data-state="In"] {
    opacity: 1;
    transform: translateX(0);
  }
`
