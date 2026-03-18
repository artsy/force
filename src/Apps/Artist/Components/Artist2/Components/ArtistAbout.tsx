import { Box, Expandable, Flex, ReadMore, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import type {
  ArtistAbout_artist$data,
  ArtistAbout_artist$key,
} from "__generated__/ArtistAbout_artist.graphql"
import type React from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistAboutProps {
  artist: ArtistAbout_artist$key
}

export const ArtistAbout: React.FC<ArtistAboutProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  const biographyText = artist.biographyBlurb?.text
  const biographyCredit = artist.biographyBlurb?.credit
  const hasBiography = !!biographyText
  const hasCredit = !!biographyCredit
  const biographyContent =
    hasBiography && hasCredit
      ? `${biographyText} ${biographyCredit}`
      : biographyText

  const hasMovements = artist.movementGenes?.length > 0
  const hasMediums = artist.mediumGenes?.length > 0
  const hasKeyFacts = hasMovements || hasMediums

  return (
    <Flex flexDirection={"column"}>
      {hasBiography && (
        <Flex
          flexDirection={["column"]}
          border="solid 1px"
          borderColor="mono10"
          p={2}
        >
          <Text variant={"xs"}>About {artist.name}</Text>
          <ReadMore maxLines={2} content={biographyContent!} />
        </Flex>
      )}

      {hasKeyFacts && (
        <>
          {/* Collapse at small screen sizes */}
          <Media at="xs">
            <Flex
              data-testid="artist-key-facts"
              flexDirection={"column"}
              border="solid 1px"
              borderColor="mono10"
              borderTop={hasBiography ? "none" : undefined}
              paddingX={2}
              paddingTop={0}
              paddingBottom={1}
            >
              <Expandable
                label={<Text color="mono60">Key facts</Text>}
                borderColor={"transparent"}
              >
                <Stack gap={2}>
                  <KeyFactsContent artist={artist} />
                </Stack>
              </Expandable>
            </Flex>
          </Media>

          {/* Display normally at larger screen sizes */}
          <Media greaterThan="xs">
            <Flex
              flexDirection={"column"}
              border="solid 1px"
              borderColor="mono10"
              borderTop={hasBiography ? "none" : undefined}
              padding={2}
            >
              <Stack gap={[2, 2, 1]}>
                <KeyFactsContent artist={artist} />
              </Stack>
            </Flex>
          </Media>
        </>
      )}
    </Flex>
  )
}

/**
 * Extracted for re-use at multiple `<Media>` breakpoints
 */
const KeyFactsContent: React.FC<{ artist: ArtistAbout_artist$data }> = ({
  artist,
}) => {
  const hasMovements = artist.movementGenes?.length > 0
  const hasMediums = artist.mediumGenes?.length > 0

  return (
    <>
      {hasMovements && (
        <Flex flexDirection={["column", "column", "row"]}>
          <Box width={["auto", "auto", "6em"]}>
            <Text variant={"xs"}>Movements</Text>
          </Box>
          <Flex flexWrap={"wrap"}>
            {artist.movementGenes.map(g => (
              <RouterLink key={g.slug} to={`/gene/${g.slug}`} color="mono60">
                <Text variant={"xs"} mr={1}>
                  {g.name}
                </Text>
              </RouterLink>
            ))}
          </Flex>
        </Flex>
      )}

      {hasMediums && (
        <Flex flexDirection={["column", "column", "row"]}>
          <Box width={["auto", "auto", "6em"]}>
            <Text variant={"xs"}>Mediums</Text>
          </Box>
          <Flex flexWrap={"wrap"}>
            {artist.mediumGenes.map(g => (
              <RouterLink key={g.slug} to={`/gene/${g.slug}`} color="mono60">
                <Text variant={"xs"} mr={1}>
                  {g.name}
                </Text>
              </RouterLink>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  )
}

const fragment = graphql`
  fragment ArtistAbout_artist on Artist {
    name
    biographyBlurb(format: HTML) {
      text
      credit
    }
    movementGenes: genes(
      geneFamilyID: "styles-and-movements"
      minValue: 50
      size: 3
    ) {
      name
      slug
    }
    mediumGenes: genes(
      geneFamilyID: "medium-and-techniques"
      minValue: 50
      size: 3
    ) {
      name
      slug
    }
  }
`
