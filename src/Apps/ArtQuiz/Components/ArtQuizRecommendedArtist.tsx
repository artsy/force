import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import {
  Button,
  Column,
  GridColumns,
  HTML,
  ReadMore,
  Shelf,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ArtQuizRecommendedArtist_artist$data } from "__generated__/ArtQuizRecommendedArtist_artist.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtQuizRecommendedArtistProps {
  artist: ArtQuizRecommendedArtist_artist$data
}

export const ArtQuizRecommendedArtist: FC<
  React.PropsWithChildren<ArtQuizRecommendedArtistProps>
> = ({ artist }) => {
  const artworks = extractNodes(artist.artworksConnection)

  return (
    <>
      <GridColumns gridRowGap={[2, 4]}>
        <Column span={6}>
          <RouterLink to={artist.href} display="block" textDecoration="none">
            <Text variant={["lg-display", "xl"]}>{artist.name}</Text>

            <Text variant={["lg-display", "xl"]} color="mono60">
              {artist.formattedNationalityAndBirthday}
            </Text>
          </RouterLink>

          <Spacer y={2} />

          <FollowArtistButtonQueryRenderer
            id={artist.internalID}
            size={["small", "large"]}
          />
        </Column>

        {artist.biographyBlurb?.text && (
          <Column span={6}>
            <HTML variant="sm">
              <ReadMore maxLines={4} content={artist.biographyBlurb.text} />
            </HTML>
          </Column>
        )}

        <Column span={12}>
          <Shelf>
            {artworks.map(artwork => {
              return (
                <ShelfArtworkFragmentContainer
                  key={artwork.internalID}
                  artwork={artwork}
                />
              )
            })}
          </Shelf>
        </Column>
      </GridColumns>
    </>
  )
}

export const ArtQuizRecommendedArtistFragmentContainer =
  createFragmentContainer(ArtQuizRecommendedArtist, {
    artist: graphql`
      fragment ArtQuizRecommendedArtist_artist on Artist {
        internalID
        name
        href
        formattedNationalityAndBirthday
        biographyBlurb(format: HTML, partnerBio: false) {
          credit
          text
        }
        artworksConnection(first: 25, sort: PUBLISHED_AT_DESC) {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
            }
          }
        }
      }
    `,
  })

export const ArtQuizRecommendedArtistPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <GridColumns gridRowGap={[2, 4]}>
      <Column span={6}>
        <SkeletonText variant={["lg-display", "xl"]}>
          Example Artist
        </SkeletonText>

        <SkeletonText variant={["lg-display", "xl"]}>
          American, b. 2000
        </SkeletonText>

        <Spacer y={2} />

        <Button variant="secondaryBlack" size={["small", "large"]} disabled>
          Follow
        </Button>
      </Column>

      <Column span={6}>
        <SkeletonText variant="sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis dicta
          voluptas beatae, quas dolore tempora veniam ratione distinctio
          accusamus atque, eum recusandae saepe velit unde mollitia perspiciatis
          aperiam ad illum?
        </SkeletonText>
      </Column>

      <Column span={12}>
        <Shelf>
          {[...new Array(8)].map((_, i) => {
            return <ShelfArtworkPlaceholder key={i} index={i} />
          })}
        </Shelf>
      </Column>
    </GridColumns>
  )
}
