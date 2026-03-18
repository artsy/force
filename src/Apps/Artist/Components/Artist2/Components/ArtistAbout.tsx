import { Column, Flex, GridColumns, Spacer, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { ArtistAbout_artist$key } from "__generated__/ArtistAbout_artist.graphql"
import type React from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistAboutProps {
  artist: ArtistAbout_artist$key
}

export const ArtistAbout: React.FC<ArtistAboutProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  // TODO: replace with actual bio/credit logic
  const biographyContent =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
  const hasBiography = !!biographyContent

  const hasMovements = artist.movementGenes.length > 0
  const hasMediums = artist.mediumGenes.length > 0
  const hasKeyFacts = hasMovements || hasMediums

  return (
    <Stack gap={0}>
      {hasBiography && (
        <GridColumns
          data-testid="artist-biography"
          border={"solid 1px"}
          borderColor={"mono10"}
          p={2}
          gridRowGap={1}
        >
          <Column span={12}>
            <Text variant={"xs"}>About {artist.name}</Text>
            <Spacer y={1} />
            <Text variant={"sm"}>{biographyContent}</Text>
          </Column>
        </GridColumns>
      )}

      {hasKeyFacts && (
        <GridColumns
          data-testid="artist-key-facts"
          border={"solid 1px"}
          borderColor={"mono10"}
          borderTop={hasBiography ? "none" : undefined}
          p={2}
          gridRowGap={1}
        >
          <Column span={[12, 12, 2]}>
            <Text variant={"xs"}>Movements</Text>
          </Column>
          <Column span={[12, 12, 10]}>
            <Flex gap={1}>
              {artist.movementGenes.map(g => (
                <RouterLink key={g.slug} to={`/gene/${g.slug}`} color="mono60">
                  <Text variant={"xs"}>{g.name}</Text>
                </RouterLink>
              ))}
            </Flex>
          </Column>

          <Column span={[12, 12, 2]}>
            <Text variant={"xs"}>Mediums</Text>
          </Column>
          <Column span={[12, 12, 10]}>
            <Flex gap={1}>
              {artist.mediumGenes.map(g => (
                <RouterLink key={g.slug} to={`/gene/${g.slug}`} color="mono60">
                  <Text variant={"xs"}>{g.name}</Text>
                </RouterLink>
              ))}
            </Flex>
          </Column>
        </GridColumns>
      )}
    </Stack>
  )
}

const fragment = graphql`
  fragment ArtistAbout_artist on Artist {
    name
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
