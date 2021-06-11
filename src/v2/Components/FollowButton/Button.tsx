import { Box, Button, ButtonProps } from "@artsy/palette"
import React, { useState } from "react"

interface FollowButtonProps {
  handleFollow?: any
  isFollowed?: boolean
  buttonProps?: Partial<ButtonProps>
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowed = false,
  buttonProps = {},
  handleFollow,
}) => {
  const [showUnfollow, setShowUnfollow] = useState(false)

  const text = isFollowed ? (showUnfollow ? "Unfollow" : "Following") : "Follow"

  return (
    <Button
      variant={isFollowed ? "secondaryOutline" : "primaryBlack"}
      onClick={handleFollow}
      onMouseEnter={() => setShowUnfollow(true)}
      onMouseLeave={() => setShowUnfollow(false)}
      data-follow={isFollowed}
      data-test="followButton"
      {...buttonProps}
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
