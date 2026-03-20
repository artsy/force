import {
  ActionType,
  type ClickedGene,
  ContextModule,
  OwnerType,
  type ToggledArtistBio,
} from "@artsy/cohesion"
import { Box, Expandable, Flex, ReadMore, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { Media } from "Utils/Responsive"
import type {
  ArtistAbout_artist$data,
  ArtistAbout_artist$key,
} from "__generated__/ArtistAbout_artist.graphql"
import type React from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistAboutProps {
  artist: ArtistAbout_artist$key
}

export const ArtistAbout: React.FC<ArtistAboutProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const trackToggledArtistBio = (expand: boolean) => {
    if (!contextPageOwnerId || !contextPageOwnerSlug) return

    const payload: ToggledArtistBio = {
      action: ActionType.toggledArtistBio,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      expand,
    }
    trackEvent(payload)
  }

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

  if (!hasBiography && !hasKeyFacts) {
    return null
  }

  return (
    <Flex data-testid="artist-about" flexDirection={"column"}>
      {hasBiography && (
        <Flex
          data-testid="artist-bio"
          flexDirection={["column"]}
          border="solid 1px"
          borderColor="mono10"
          p={2}
        >
          <Text variant={"xs"}>About {artist.name}</Text>
          <ReadMore
            maxLines={2}
            content={biographyContent!}
            onReadMoreClicked={() => trackToggledArtistBio(true)}
            onReadLessClicked={() => trackToggledArtistBio(false)}
          />
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
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const trackGeneClick = (
    gene:
      | ArtistAbout_artist$data["movementGenes"][number]
      | ArtistAbout_artist$data["mediumGenes"][number],
  ) => {
    if (!contextPageOwnerId || !contextPageOwnerSlug) return

    const payload: ClickedGene = {
      action: ActionType.clickedGene,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.gene,
      destination_page_owner_id: gene.internalID,
      destination_page_owner_slug: gene.slug,
    }
    trackEvent(payload)
  }

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
              <RouterLink
                key={g.slug}
                to={`/gene/${g.slug}`}
                color="mono60"
                onClick={() => trackGeneClick(g)}
              >
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
              <RouterLink
                key={g.slug}
                to={`/gene/${g.slug}`}
                color="mono60"
                onClick={() => trackGeneClick(g)}
              >
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
      internalID
      name
      slug
    }
    mediumGenes: genes(
      geneFamilyID: "medium-and-techniques"
      minValue: 50
      size: 3
    ) {
      internalID
      name
      slug
    }
  }
`
