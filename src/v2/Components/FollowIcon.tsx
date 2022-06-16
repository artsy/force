import {
  Flex,
  Text,
  color,
  AddCircleIcon,
  CheckCircleIcon,
} from "@artsy/palette"
import * as React from "react";
import styled from "styled-components"

interface FollowIconProps {
  readonly isFollowed?: boolean | false
}

export const FollowIconContainer = styled(Flex)`
  align-items: center;
  color: ${color("black100")};
  cursor: pointer;
`

const Follow = styled(props => (
  <Text variant="caption" {...props}>
    Follow
  </Text>
))``

const Unfollow = styled(props => (
  <Text variant="caption" {...props}>
    Unfollow
  </Text>
))``

const Following = styled(props => (
  <Text variant="caption" {...props}>
    Following
  </Text>
))``

const FollowingHover = styled.div`
  ${Unfollow} {
    display: none;
  }

  &:hover {
    color: ${color("red100")};

    ${Following} {
      display: none;
    }

    ${Unfollow} {
      display: block;
    }
  }
`

const FollowHover = styled.div`
  &:hover {
    color: ${color("purple100")};
  }
`

export const FollowIcon: React.FC<FollowIconProps> = ({ isFollowed }) => {
  return (
    <FollowIconContainer data-test="followButton">
      {isFollowed ? <CheckCircleIcon mr="5px" /> : <AddCircleIcon mr="5px" />}
      {isFollowed ? (
        <FollowingHover>
          <Following />
          <Unfollow />
        </FollowingHover>
      ) : (
        <FollowHover>
          <Follow />
        </FollowHover>
      )}
    </FollowIconContainer>
  )
}

// Tests
Follow.displayName = "Follow"
Following.displayName = "Following"
Unfollow.displayName = "Unfollow"
