import {
  Box,
  Clickable,
  Column,
  Expandable,
  Flex,
  FullBleed,
  GridColumns,
  HTML,
  HTMLProps,
  Image,
  ReadMore,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ArtistHeader2_artist$data } from "__generated__/ArtistHeader2_artist.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useArtistHeaderPalette } from "Apps/Artist/Components/ArtistHeader/useArtistHeaderPalette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import { useMode } from "Utils/Hooks/useMode"

interface ArtistHeader2Props {
  artist: ArtistHeader2_artist$data
}

const ArtistHeader2: React.FC<ArtistHeader2Props> = ({ artist }) => {
  const [mode, setMode] = useMode<"Collapsed" | "Expanded">("Expanded")

  const handleClick = () => {
    setMode(mode === "Collapsed" ? "Expanded" : "Collapsed")
  }

  const iconicWork = artist.iconicArtworks?.edges?.[0]?.node
  const image = iconicWork?.image?.resized
  const insights = artist.insights ?? []

  const {
    backgroundColor,
    foregroundColor,
    secondaryColor,
    overlayColor,
    buttonVariant,
  } = useArtistHeaderPalette(iconicWork?.dominantColors[0] ?? "#000000")

  const hasImage = !!image
  const hasInsights = insights.length > 0
  const isTruncated = insights.length < 5

  if (mode === "Collapsed") {
    return (
      <>
        <GridColumns>
          <Column span={8} display="flex" alignItems="center">
            <Text as="h1" variant="xl">
              {artist.name}
            </Text>

            <Spacer x={2} />

            <FollowArtistButtonQueryRenderer
              id={artist.internalID}
              contextModule={ContextModule.artistHeader}
              size="small"
            />
          </Column>

          <Column span={4} display="flex" justifyContent="flex-end">
            <Expand onClick={handleClick} title="Show additional information">
              <ChevronDownIcon />

              <Spacer x={1} />

              <Text variant="sm-display">Expand</Text>
            </Expand>
          </Column>
        </GridColumns>
      </>
    )
  }

  return (
    <FullBleed
      key={artist.internalID}
      data-test="artistHeader"
      bg={backgroundColor}
      color={foregroundColor}
    >
      <Box width="100%" height="100%" bg={overlayColor}>
        <AppContainer>
          <HorizontalPadding pt={4} position="relative">
            <GridColumns gridRowGap={2} gridColumnGap={[0, 4]}>
              {hasImage && (
                <Column span={3}>
                  <ResponsiveBox
                    aspectWidth={image.width ?? 1}
                    aspectHeight={image.height ?? 1}
                    maxWidth="100%"
                  >
                    <Image
                      src={image.src}
                      srcSet={image.srcSet}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    />
                  </ResponsiveBox>
                </Column>
              )}

              <Column span={hasInsights ? 5 : 9}>
                <Flex alignItems="center" flexDirection={["column", "row"]}>
                  <Box flex={1}>
                    <Text as="h1" variant="xl">
                      {artist.name}
                    </Text>

                    <Text as="h2" variant="xl" color={secondaryColor}>
                      {artist.formattedNationalityAndBirthday}
                    </Text>
                  </Box>

                  <Spacer x={2} y={2} />

                  <Box>
                    <FollowArtistButtonQueryRenderer
                      // TODO: Build out a `secondaryNeutralDark` variant
                      // @ts-ignore
                      variant={buttonVariant}
                      id={artist.internalID}
                      contextModule={ContextModule.artistHeader}
                      size="small"
                      width="100%"
                    />

                    {!!artist.counts?.follows && (
                      <>
                        <Spacer y={1} />

                        <Text
                          variant="xs"
                          color={secondaryColor}
                          textAlign="center"
                        >
                          {formatFollowerCount(artist.counts.follows)} Followers
                        </Text>
                      </>
                    )}
                  </Box>
                </Flex>

                {artist.biographyBlurb?.text && (
                  <>
                    <Spacer y={2} />

                    {isTruncated ? (
                      <Bio variant="sm" color={secondaryColor}>
                        <ReadMore
                          maxChars={250}
                          content={artist.biographyBlurb.text}
                        />
                      </Bio>
                    ) : (
                      <Bio
                        variant="sm"
                        color={secondaryColor}
                        html={artist.biographyBlurb.text}
                      />
                    )}
                  </>
                )}
              </Column>

              {insights.length > 0 && (
                <Column span={4}>
                  <Text variant="sm" color={secondaryColor}>
                    Career Highlights
                  </Text>

                  <Spacer y={1} />

                  {artist.insights.map((insight, index) => {
                    return (
                      <Expandable
                        key={insight.kind ?? index}
                        label={insight.label}
                        pb={1}
                        borderColor={secondaryColor}
                      >
                        <Text variant="xs" color={secondaryColor}>
                          {insight.entities.length > 0
                            ? insight.entities.join(", ")
                            : insight.description}
                        </Text>
                      </Expandable>
                    )
                  })}
                </Column>
              )}
            </GridColumns>

            <Collapse title="Hide additional information" onClick={handleClick}>
              <ChevronUpIcon m="auto" fill={foregroundColor} />
            </Collapse>
          </HorizontalPadding>
        </AppContainer>
      </Box>
    </FullBleed>
  )
}

export const ArtistHeader2FragmentContainer = createFragmentContainer(
  ArtistHeader2,
  {
    artist: graphql`
      fragment ArtistHeader2_artist on Artist {
        internalID
        slug
        name
        formattedNationalityAndBirthday
        counts {
          follows
        }
        biographyBlurb(format: HTML, partnerBio: false) {
          credit
          text
        }
        insights {
          kind
          label
          description
          entities
        }
        iconicArtworks: artworksConnection(first: 1, sort: ICONICITY_DESC) {
          edges {
            node {
              dominantColors
              image {
                resized(width: 425, height: 425) {
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
  }
)

const Collapse = styled(Clickable)`
  display: flex;
  margin: auto;
  height: ${themeGet("space.6")};
  padding: 0 ${themeGet("space.4")};

  svg {
    transition: transform 200ms, opacity 200ms;
    opacity: 0.6;
  }

  &:hover {
    svg {
      transform: translateY(-0.25em);
      opacity: 1;
    }
  }
`

const Expand = styled(Clickable)`
  display: flex;
  align-items: center;
  opacity: 0.6;
  transition: opacity 200ms;

  &:hover {
    opacity: 1;
  }
`

const Bio = styled(HTML)<HTMLProps>`
  a:hover {
    color: currentColor;
  }
`

const formatFollowerCount = (n: number) => {
  try {
    const formatter = Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    })

    return formatter.format(n).toLocaleLowerCase()
  } catch (error) {
    return n
  }
}
