import { Flex, Text, color } from "@artsy/palette"
import Icon from "v2/Components/Icon"
import React from "react"
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

export class FollowIcon extends React.Component<FollowIconProps> {
  render() {
    const { isFollowed } = this.props
    const iconName = isFollowed ? "follow-circle.is-following" : "follow-circle"

    return (
      <FollowIconContainer data-test="followButton">
        <Icon
          name={iconName}
          style={{
            verticalAlign: "left",
            color: "inherit",
            margin: "0 0 0 -5px",
          }}
        />
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
}

// Tests
Follow.displayName = "Follow"
Following.displayName = "Following"
Unfollow.displayName = "Unfollow"
