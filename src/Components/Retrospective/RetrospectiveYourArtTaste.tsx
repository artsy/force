import { Box, Button, FullBleed, Image, Spacer, Text } from "@artsy/palette"
import { FC, useEffect } from "react"
import { graphql } from "react-relay"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { RetrospectiveData } from "./useRetrospectiveData"
import { RetrospectiveYourArtTasteQuery } from "__generated__/RetrospectiveYourArtTasteQuery.graphql"
import { compact } from "lodash"
import styled from "styled-components"
import Marquee from "react-fast-marquee"
import { useTransition } from "Utils/Hooks/useTransition"
import { wait } from "Utils/wait"

interface RetrospectiveYourArtTasteProps {
  data: RetrospectiveData
  onEnd: () => void
}

export const RetrospectiveYourArtTaste: FC<RetrospectiveYourArtTasteProps> = ({
  data: { topGenes, topMediums, topRarities, mediums, genes, rarities },
  onEnd,
}) => {
  const [[favGeneId]] = topGenes
  const [[favMediumId]] = topMediums
  const [[favRarityId]] = topRarities

  const favGene = genes.find(gene => gene.slug === favGeneId)!
  const favRarity = rarities.find(rarity => rarity.internalID === favRarityId)!
  const favMedium = mediums.find(medium => medium.internalID === favMediumId)!

  const { data, loading } = useClientQuery<RetrospectiveYourArtTasteQuery>({
    query: graphql`
      query RetrospectiveYourArtTasteQuery(
        $medium: String!
        $geneID: String!
        $rarity: [String]!
      ) {
        artworksConnection(
          first: 50
          medium: $medium
          geneID: $geneID
          attributionClass: $rarity
          sort: "-merchandisability"
        ) {
          edges {
            node {
              title
              href
              image {
                resized(height: 200, version: ["larger", "large"]) {
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
    `,
    variables: {
      medium: favMediumId,
      geneID: favGeneId,
      rarity: [favRarityId],
    },
  })

  useEffect(() => {
    document.body.style.backgroundColor = "#0A1C7B"
    document.body.style.color = "#fff"

    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.color = ""
    }
  }, [])

  const { register, transition } = useTransition({
    initialStatus: "Out",
  })

  useEffect(() => {
    const init = async () => {
      if (loading) return
      await wait(500)
      transition("In")
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const artworks = compact(
    data?.artworksConnection?.edges?.map(edge => edge?.node)
  )

  const left = artworks.slice(0, 24)
  const right = artworks.slice(25, 50)

  if (loading) return null

  const marqueProps = {
    speed: 60,
    gradientColor: [16, 35, 215] as [number, number, number],
  }

  return (
    <Box>
      <Title
        ref={register(0)}
        variant="xxl"
        maxWidth={900}
        m="auto"
        data-state="Out"
      >
        Based on your art taste:{" "}
        <Box as="span" color="black30">
          {favMedium.name}
        </Box>
        ,{" "}
        <Box as="span" color="black30">
          {favGene.name}
        </Box>
        ,{" "}
        <Box as="span" color="black30">
          {favRarity.name}
        </Box>{" "}
        — here are some artworks you might like.
      </Title>

      <Spacer y={4} />

      <MarqueeTransition ref={register(1)} data-state="Out">
        <FullBleed
          py={1}
          bg="blue150"
          style={{
            transform: "translateZ(0)",
          }}
        >
          <Marquee {...marqueProps}>
            <Duplicate>
              <Box display="flex" style={{ gap: 10 }} flexWrap="nowrap">
                {left.map(artwork => {
                  const image = artwork.image!.resized!

                  return (
                    <Box
                      as="a"
                      // @ts-ignore
                      href={artwork.href!}
                      target="_blank"
                      key={image.src}
                      flexShrink={0}
                      bg="black30"
                      width={image.width}
                      height={image.height}
                      display="block"
                    >
                      <Image
                        src={image.src}
                        srcSet={image.srcSet}
                        width="100%"
                        height="100%"
                        alt=""
                      />
                    </Box>
                  )
                })}
              </Box>
            </Duplicate>
          </Marquee>

          <Spacer y={1} />

          <Marquee {...marqueProps} direction="right">
            <Duplicate>
              <Box display="flex" style={{ gap: 10 }} flexWrap="nowrap">
                {right.map(artwork => {
                  const image = artwork.image!.resized!
                  return (
                    <Box
                      as="a"
                      // @ts-ignore
                      href={artwork.href!}
                      target="_blank"
                      key={image.src}
                      flexShrink={0}
                      bg="black30"
                      width={image.width}
                      height={image.height}
                      display="block"
                    >
                      <Image
                        src={image.src}
                        srcSet={image.srcSet}
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  )
                })}
              </Box>
            </Duplicate>
          </Marquee>
        </FullBleed>
      </MarqueeTransition>

      <Spacer y={4} />

      <Cta
        display="flex"
        justifyContent="center"
        ref={register(2)}
        data-state="Out"
      >
        <Button variant="secondaryWhite" onClick={onEnd}>
          Revisit
        </Button>
      </Cta>
    </Box>
  )
}

const Duplicate: FC = ({ children }) => {
  return (
    <Box display="flex" ml={1} style={{ gap: 10 }}>
      <Box>{children}</Box>
      <Box>{children}</Box>
      <Box>{children}</Box>
      <Box>{children}</Box>
    </Box>
  )
}

const Title = styled(Text)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(10px);
  }

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);
  }
`

const MarqueeTransition = styled(Box)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(20px);
  }

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);
  }
`

const Cta = styled(Box)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(20px);
  }

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);
  }
`
