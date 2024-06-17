import { FC, ReactNode } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule } from "@artsy/cohesion"
import { Avatar, BoxProps, Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { EntityHeaderArtist_artist$data } from "__generated__/EntityHeaderArtist_artist.graphql"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"

export interface EntityHeaderArtistProps extends BoxProps {
  artist: EntityHeaderArtist_artist$data
  children?: ReactNode
  displayAvatar?: boolean
  displayCounts?: boolean
  displayFollowButton?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
  onClick?(): void
  onFollow?(): void
}

const EntityHeaderArtist: FC<EntityHeaderArtistProps> = ({
  artist,
  displayAvatar = true,
  displayCounts = false,
  displayFollowButton = true,
  displayLink = true,
  FollowButton,
  onClick,
  onFollow,
  children,
  ...rest
}) => {
  const initials = artist.initials ?? artist.name?.[0]
  const image = artist.coverArtwork?.avatar?.cropped
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
        onClick={onClick}
      >
        {displayAvatar && (image || initials) && (
          <Avatar size="xs" mr={1} initials={initials} lazyLoad {...image} />
        )}

        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="sm-display" lineClamp={2}>
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

          {children}
        </Flex>
      </Flex>

      {displayFollowButton &&
        (FollowButton || (
          <FollowArtistButtonQueryRenderer
            id={artist.internalID}
            contextModule={ContextModule.artistHeader}
            size="small"
            onFollow={onFollow}
          />
        ))}
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
        coverArtwork {
          avatar: image {
            cropped(width: 45, height: 45) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
