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
  const image = artist?.avatar?.cropped
  const initials = artist?.name?.[0]
  const meta = submission.title

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Flex display="flex" alignItems="center" minWidth={0} flex={1}>
        {displayAvatar && (image || initials) && (
          <Avatar size="xs" mr={1} initials={initials} lazyLoad {...image} />
        )}

        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="sm-display" lineClamp={2}>
            {submission.title ?? "Unknown"}
          </Text>

          {meta && (
            <Text variant="xs" color="black60" overflowEllipsis>
              {meta}
            </Text>
          )}
        </Flex>
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
          name
          avatar: image {
            cropped(width: 45, height: 45, version: ["big_and_tall", "tall"]) {
              src
              srcSet
            }
          }
        }
        title
      }
    `,
  }
)
