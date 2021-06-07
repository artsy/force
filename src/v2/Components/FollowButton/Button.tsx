import { Box, Button, ButtonProps } from "@artsy/palette"
import React from "react"

interface Props {
  handleFollow?: any
  isFollowed?: boolean
  buttonProps?: Partial<ButtonProps>
}

interface State {
  showUnfollow: boolean
}

export class FollowButton extends React.Component<Props, State> {
  static defaultProps = {
    isFollowed: false,
    buttonProps: {},
  }

  state = {
    showUnfollow: false,
  }

  render() {
    const { showUnfollow } = this.state
    const { buttonProps, handleFollow, isFollowed } = this.props

    const text = isFollowed
      ? showUnfollow
        ? "Unfollow"
        : "Following"
      : "Follow"

    const props = {
      ...buttonProps,
      onClick: handleFollow,
      onMouseEnter: () => this.setState({ showUnfollow: true }),
      onMouseLeave: () => this.setState({ showUnfollow: false }),
    }

    return (
      <Button
        variant={isFollowed ? "secondaryOutline" : "primaryBlack"}
        {...props}
        data-follow={isFollowed}
        data-test="followButton"
      >
        {/*
          To prevent layout shift: the longest string this
          contains is "Following": position that, hide it,
          then overlay the normal labels.
        */}
        <Box opacity={0} style={{ pointerEvents: "none" }} aria-hidden="true">
          Following
        </Box>

        <Box
          position="absolute"
          top="50%"
          left="50%"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {text}
        </Box>
      </Button>
    )
  }
}
