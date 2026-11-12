import {
  ActionType,
  ContextModule,
  type ToggledArtistBio,
} from "@artsy/cohesion"
import {
  Box,
  Column,
  GridColumns,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  ArtistStylesAndTechniques,
  useHasArtistStylesAndTechniques,
} from "Apps/Artist/Components/ArtistHeader/ArtistStylesAndTechniques"
import {
  ArtistStoryRepresentation,
  useHasArtistStoryRepresentation,
} from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryRepresentation"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistStoryIntro_artist$key } from "__generated__/ArtistStoryIntro_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistStoryIntroProps {
  artist: ArtistStoryIntro_artist$key
}

export const ArtistStoryIntro: React.FC<ArtistStoryIntroProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()
  const hasStylesAndTechniques = useHasArtistStylesAndTechniques(artist)
  const hasRepresentation = useHasArtistStoryRepresentation(artist)

  const pullQuoteText = artist.featuredStory?.pullQuote?.text.trim()
  const pullQuoteAttribution =
    artist.featuredStory?.pullQuote?.attribution?.trim()

  const biographyText = artist.biographyBlurb?.text
  const biographyCredit = artist.biographyBlurb?.credit
  const biographyContent =
    biographyText && biographyCredit
      ? `${biographyText} ${biographyCredit}`
      : biographyText

  if (!pullQuoteText && !biographyContent && !hasRepresentation) {
    return null
  }

  const handleToggle = (expand: boolean) => {
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

  return (
    <Box data-testid="artist-story-intro">
      {pullQuoteText && (
        <GridColumns>
          <Column span={[12, 10]}>
            <Text as="blockquote" variant={["xl", "xxl"]} m={0}>
              {`“${pullQuoteText}”`}
            </Text>

            {pullQuoteAttribution && (
              <Text variant={["xs", "sm"]} color="mono60" mt={1}>
                {pullQuoteAttribution}
              </Text>
            )}
          </Column>
        </GridColumns>
      )}

      {(biographyContent || hasRepresentation) && (
        <>
          {pullQuoteText && <Spacer y={2} />}

          <GridColumns gridRowGap={4}>
            {biographyContent && (
              <Column span={[12, 8]}>
                <Text variant="sm">
                  <ReadMore
                    maxLines={4}
                    content={biographyContent}
                    onReadMoreClicked={() => handleToggle(true)}
                    onReadLessClicked={() => handleToggle(false)}
                  />
                </Text>
              </Column>
            )}

            {hasRepresentation && (
              <Column span={[12, 4]} start={[1, 9]}>
                <ArtistStoryRepresentation artist={artist} />
              </Column>
            )}
          </GridColumns>

          {hasStylesAndTechniques && (
            <>
              <Spacer y={4} />

              <GridColumns>
                <Column span={[12, 6]}>
                  <ArtistStylesAndTechniques
                    artist={artist}
                    contextModule={ContextModule.artistHeader}
                  />
                </Column>
              </GridColumns>
            </>
          )}
        </>
      )}
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryIntro_artist on Artist {
    biographyBlurb(format: HTML) {
      text
      credit
    }
    featuredStory {
      pullQuote {
        text
        attribution
      }
    }
    ...ArtistStylesAndTechniques_artist
    ...ArtistStoryRepresentation_artist
  }
`
