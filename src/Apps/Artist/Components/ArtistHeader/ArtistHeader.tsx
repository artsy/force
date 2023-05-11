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
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ArtistHeader_artist$data } from "__generated__/ArtistHeader_artist.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useArtistHeaderPalette } from "Apps/Artist/Components/ArtistHeader/useArtistHeaderPalette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
import { useMode } from "Utils/Hooks/useMode"
import { RouterLink } from "System/Router/RouterLink"
import { sortBy } from "lodash"
import {
  ArtistHeaderImage,
  isValidImage,
} from "Apps/Artist/Components/ArtistHeader/ArtistHeaderImage"
// TODO:
// import { ProgressiveOnboardingFollowArtist } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"

interface ArtistHeaderProps {
  artist: ArtistHeader_artist$data
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ artist }) => {
  const [mode, setMode] = useMode<"Collapsed" | "Expanded">("Expanded")

  const handleClick = () => {
    setMode(mode === "Collapsed" ? "Expanded" : "Collapsed")
  }

  const iconicWork = artist.iconicArtworks?.edges?.[0]?.node
  const image = iconicWork?.image

  const {
    backgroundColor,
    foregroundColor,
    secondaryColor,
    overlayColor,
    invert,
  } = useArtistHeaderPalette(iconicWork?.dominantColors[0] ?? "#000000")

  const hasImage = isValidImage(image)
  const hasInsights = artist.insights.length > 0
  const hasBio = artist.biographyBlurb?.text
  const hasSomething = hasImage || hasInsights || hasBio

  const insights = sortBy(artist.insights, ({ kind }) => {
    return INSIGHTS.indexOf(`${kind}`)
  })

  if (mode === "Collapsed") {
    return (
      <>
        <Spacer y={[2, 4]} />

        <GridColumns>
          <Column
            span={8}
            display="flex"
            alignItems={["left", "center"]}
            gap={2}
            flexDirection={["column", "row"]}
          >
            <Text as="h1" variant="xl">
              {artist.name}
            </Text>

            <FollowArtistButtonQueryRenderer
              id={artist.internalID}
              contextModule={ContextModule.artistHeader}
              size="small"
              width="fit-content"
            />
          </Column>

          <Column span={4} display="flex" justifyContent="flex-end">
            <Clickable
              onClick={handleClick}
              title="Show additional information"
              textDecoration="underline"
            >
              <Text variant="sm-display">Expand</Text>
            </Clickable>
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
                <Column
                  span={3}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <ArtistHeaderImage image={image} bg={secondaryColor} />
                </Column>
              )}

              <Column
                span={hasInsights ? 5 : 8}
                display="flex"
                flexDirection="column"
                gap={2}
                textAlign={["center", "left"]}
              >
                <Flex
                  alignItems="center"
                  flexDirection={["column", "row"]}
                  justifyContent={["center", "space-between"]}
                  gap={2}
                >
                  <Flex flexDirection="column" gap={2}>
                    <Box flex={1}>
                      <Text as="h1" variant="xl">
                        {artist.name}
                      </Text>

                      <Text as="h2" variant="xl" color={secondaryColor}>
                        {artist.formattedNationalityAndBirthday}
                      </Text>
                    </Box>

                    {!hasSomething && (
                      <FollowArtistButtonQueryRenderer
                        id={artist.internalID}
                        contextModule={ContextModule.artistHeader}
                        size="small"
                        width="fit-content"
                        {...(invert && { style: { filter: "invert(100%)" } })}
                      />
                    )}
                  </Flex>

                  {hasSomething && (
                    <Flex
                      flexDirection={["row", "column"]}
                      alignItems="center"
                      gap={1}
                    >
                      <FollowArtistButtonQueryRenderer
                        id={artist.internalID}
                        contextModule={ContextModule.artistHeader}
                        size="small"
                        width="100%"
                        {...(invert && { style: { filter: "invert(100%)" } })}
                      />

                      {!!artist.counts?.follows && (
                        <Text
                          variant="xs"
                          color={secondaryColor}
                          textAlign="center"
                          flexShrink={0}
                        >
                          {formatFollowerCount(artist.counts.follows)} Follower
                          {artist.counts.follows === 1 ? "" : "s"}
                        </Text>
                      )}
                    </Flex>
                  )}
                </Flex>

                {hasBio && (
                  <Bio variant="sm" color={secondaryColor}>
                    <ReadMore
                      maxChars={250}
                      content={artist.biographyBlurb.text}
                    />
                  </Bio>
                )}

                <CV to={`/artist/${artist.slug}/cv`} color={secondaryColor}>
                  See all past shows and fair booths
                </CV>
              </Column>

              {insights.length > 0 && (
                <Column span={4} {...(!hasImage && { start: 9 })}>
                  <Text variant="sm" color={secondaryColor}>
                    Highlights and Achievements
                  </Text>

                  <Spacer y={1} />

                  {insights.slice(0, 6).map((insight, index) => {
                    return (
                      <Expandable
                        key={insight.kind ?? index}
                        label={insight.label}
                        pb={1}
                        borderColor={secondaryColor}
                      >
                        <Text variant="sm" color={secondaryColor} pb={1}>
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

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  {
    artist: graphql`
      fragment ArtistHeader_artist on Artist {
        internalID
        slug
        name
        formattedNationalityAndBirthday
        counts {
          follows
        }
        biographyBlurb(format: HTML, partnerBio: false) {
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
                src: url(version: ["larger", "larger"])
                width
                height
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

const Bio = styled(HTML)<HTMLProps>`
  text-align: left;

  a:hover {
    color: currentColor;
  }
`

const CV = styled(RouterLink)`
  &:hover {
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

const INSIGHTS = [
  "HIGH_AUCTION_RECORD",
  "ACTIVE_SECONDARY_MARKET",
  "CRITICALLY_ACCLAIMED",
  "ARTSY_VANGUARD_YEAR",
  "SOLO_SHOW",
  "GROUP_SHOW",
  "BIENNIAL",
  "PRIVATE_COLLECTIONS",
  "COLLECTED",
  "REVIEWED",
  "RESIDENCIES",
  "AWARDS",
]
