import { Box, Button, ButtonProps, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import {
  forwardRef,
  ForwardRefExoticComponent,
  MouseEventHandler,
  ReactNode,
  Ref,
  useMemo,
  useState,
} from "react"
import styled from "styled-components"

export type FollowButtonRenderProps = (
  label: "Follow" | "Following" | "Unfollow"
) => ReactNode

export interface FollowButtonProps
  extends Omit<Partial<ButtonProps>, "variant"> {
  children?: FollowButtonRenderProps
  handleFollow?: MouseEventHandler<HTMLButtonElement>
  isFollowed?: boolean
}

export const FollowButton: ForwardRefExoticComponent<
  FollowButtonProps & { ref?: Ref<HTMLElement> }
> = forwardRef(
  ({ children, handleFollow, isFollowed = false, ...rest }, forwardedRef) => {
    const [showUnfollow, setShowUnfollow] = useState(false)

    const label = useMemo(() => {
      if (isFollowed && showUnfollow) return "Unfollow"
      if (isFollowed) return "Following"
      return "Follow"
    }, [isFollowed, showUnfollow])

    return (
      <StyledButton
        ref={forwardedRef as any}
        onClick={handleFollow}
        variant="secondaryNeutral"
        success={isFollowed}
        onMouseEnter={() => setShowUnfollow(true)}
        onMouseLeave={() => setShowUnfollow(false)}
        data-follow={isFollowed}
        data-test="followButton"
        {...rest}
      >
        {/* To prevent layout shift: the longest string this contains is
        "Following": position that, hide it, then overlay the normal labels. */}
        <Box position="relative">
          <Box
            as="span"
            style={{ pointerEvents: "none", visibility: "hidden" }}
            aria-hidden="true"
          >
            {children ? children("Following") : "Following"}
          </Box>

          <Box
            position="absolute"
            top="50%"
            left="50%"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {children ? children(label) : label}
          </Box>
        </Box>
      </StyledButton>
    )
  }
)

export const FollowButtonInlineCount = styled(Text).attrs({ variant: "xs" })``

const StyledButton = styled(Button)`
  ${FollowButtonInlineCount} {
    color: ${themeGet("colors.black60")};
  }

  &:focus,
  &:hover,
  &:active,
  &:disabled {
    ${FollowButtonInlineCount} {
      color: currentColor;
    }
  }
`
