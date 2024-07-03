import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Avatar, BoxProps, Flex, Text } from "@artsy/palette"
import { EntityHeaderSubmission_submission$data } from "__generated__/EntityHeaderSubmission_submission.graphql"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface EntityHeaderSubmissionProps extends BoxProps {
  submission: EntityHeaderSubmission_submission$data
  displayAvatar?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
}

const EntityHeaderSubmission: FC<EntityHeaderSubmissionProps> = ({
  submission,
  displayAvatar = true,
  displayLink = true,
  FollowButton,
  ...rest
}) => {
  const artist = submission.artist

  if (!artist) return null

  const image = artist?.coverArtwork?.avatar?.cropped
  const initials = artist?.initials || ""
  const title = submission.title

  return (
    <Flex
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      border="1px solid"
      borderColor="black10"
      borderRadius={5}
      {...rest}
    >
      <Flex display="flex" alignItems="center" minWidth={0} flex={1}>
        {displayAvatar && (image || initials) && (
          <Avatar size="xs" mr={1} initials={initials} lazyLoad {...image} />
        )}

        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="sm-display" lineClamp={2}>
            {artist?.name ?? "Unknown"}
          </Text>

          {title && (
            <Text variant="xs" color="black60" overflowEllipsis>
              {title}
            </Text>
          )}
        </Flex>

        <ChevronRightIcon />
      </Flex>
    </Flex>
  )
}

export const EntityHeaderSubmissionFragmentContainer = createFragmentContainer(
  EntityHeaderSubmission,
  {
    submission: graphql`
      fragment EntityHeaderSubmission_submission on ConsignmentSubmission {
        artist {
          initials
          name
          coverArtwork {
            avatar: image {
              cropped(width: 45, height: 45) {
                src
                srcSet
              }
            }
          }
        }
        title
      }
    `,
  }
)
