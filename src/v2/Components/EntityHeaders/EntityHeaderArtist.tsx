import { ContextModule } from "@artsy/cohesion"
import { Avatar, BoxProps, Text, Flex } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { EntityHeaderArtist_artist } from "v2/__generated__/EntityHeaderArtist_artist.graphql"
import { FollowArtistButtonQueryRenderer } from "../FollowButton/FollowArtistButton"

export interface EntityHeaderArtistProps extends BoxProps {
  artist: EntityHeaderArtist_artist
  displayAvatar?: boolean
  displayCounts?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
}

const EntityHeaderArtist: FC<EntityHeaderArtistProps> = ({
  artist,
  displayAvatar = true,
  displayCounts = false,
  displayLink = true,
  FollowButton,
  ...rest
}) => {
  const initials = artist.initials ?? artist.name?.[0]
  const image = artist.avatar?.cropped
  const counts = artist.counts

  return (
    <Flex alignItems="center" justifyContent="space-between" {...rest}>
      <Flex
        {...(displayLink
          ? { as: RouterLink, to: artist.href, textDecoration: "none" }
          : {})}
        display="flex"
        alignItems="center"
        minWidth={0}
        flex={1}
      >
        {displayAvatar && (image || initials) && (
          <Avatar size="xs" mr={1} initials={initials} lazyLoad {...image} />
        )}

        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="md" lineClamp={2}>
            {artist.name ?? "Unknown"}
          </Text>

          {artist.formattedNationalityAndBirthday && (
            <Text variant="xs" color="black60" overflowEllipsis>
              {artist.formattedNationalityAndBirthday}
            </Text>
          )}

          {displayCounts && counts && (counts.artworks ?? 0) > 0 && (
            <Text variant="xs" fontWeight="bold" overflowEllipsis>
              {counts.artworks} work
              {counts.artworks === 1 ? "" : "s"}
              {(counts.forSaleArtworks ?? 0) > 0 &&
                counts.forSaleArtworks !== counts.artworks && (
                  <>, {counts.forSaleArtworks} for sale</>
                )}
            </Text>
          )}
        </Flex>
      </Flex>

      {FollowButton || (
        <FollowArtistButtonQueryRenderer
          id={artist.internalID}
          contextModule={ContextModule.artistHeader}
          buttonProps={{ size: "small", variant: "secondaryOutline" }}
        />
      )}
    </Flex>
  )
}

export const EntityHeaderArtistFragmentContainer = createFragmentContainer(
  EntityHeaderArtist,
  {
    artist: graphql`
      fragment EntityHeaderArtist_artist on Artist {
        internalID
        href
        slug
        name
        initials
        formattedNationalityAndBirthday
        counts {
          artworks
          forSaleArtworks
        }
        avatar: image {
          cropped(width: 45, height: 45) {
            src
            srcSet
          }
        }
      }
    `,
  }
)
