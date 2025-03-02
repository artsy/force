import {
  Box,
  Flex,
  HorizontalOverflow,
  Pill,
  Spacer,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistRelatedGeneCategoriesQuery } from "__generated__/ArtistRelatedGeneCategoriesQuery.graphql"
import type { ArtistRelatedGeneCategories_artist$data } from "__generated__/ArtistRelatedGeneCategories_artist.graphql"
import { type FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistRelatedGeneCategoriesProps {
  artist: ArtistRelatedGeneCategories_artist$data
}

const ArtistRelatedGeneCategories: FC<
  React.PropsWithChildren<ArtistRelatedGeneCategoriesProps>
> = ({ artist }) => {
  const genes = extractNodes(artist.related?.genes)

  const pills = useMemo(
    () => (
      <Flex flexWrap="wrap" gap={1} width={[1000, "auto"]}>
        {genes.map(gene => {
          return (
            <Pill
              key={gene.internalID}
              as={RouterLink}
              // @ts-ignore
              to={gene.href}
            >
              {gene.name}
            </Pill>
          )
        })}
      </Flex>
    ),
    [genes],
  )

  if (genes.length === 0) return null

  return (
    <Box>
      <Text variant="lg-display">Related Categories</Text>

      <Spacer y={4} />

      <Media at="xs">
        <HorizontalOverflow>{pills}</HorizontalOverflow>
      </Media>

      <Media greaterThan="xs">{pills}</Media>
    </Box>
  )
}

export const ArtistRelatedGeneCategoriesFragmentContainer =
  createFragmentContainer(ArtistRelatedGeneCategories, {
    artist: graphql`
      fragment ArtistRelatedGeneCategories_artist on Artist {
        related {
          genes {
            edges {
              node {
                internalID
                href
                name
              }
            }
          }
        }
      }
    `,
  })

export const ArtistRelatedGeneCategoriesQueryRenderer: FC<
  React.PropsWithChildren<{ slug: string }>
> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtistRelatedGeneCategoriesQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      query={graphql`
        query ArtistRelatedGeneCategoriesQuery($slug: String!) {
          artist(id: $slug) {
            ...ArtistRelatedGeneCategories_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.artist) {
          return (
            <ArtistRelatedGeneCategoriesFragmentContainer
              artist={props.artist}
            />
          )
        }

        return null
      }}
    />
  )
}
