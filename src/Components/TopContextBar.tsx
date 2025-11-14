import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import {
  Box,
  Clickable,
  Flex,
  FullBleed,
  Image,
  Separator,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { cropped } from "Utils/resized"
import { sanitizeRedirect } from "Utils/sanitizeRedirect"
import type * as React from "react"

export interface TopContextBarProps {
  displayBackArrow?: boolean
  href?: string | null
  /** Should the biggest size image available */
  src?: string | null
  rightContent?: React.ReactNode
  onClick?(): void
  hideSeparator?: boolean
  /** When true, clicking the back arrow will first try to use browser history, falling back to href */
  preferHistoryBack?: boolean
}

export const TopContextBar: React.FC<
  React.PropsWithChildren<TopContextBarProps>
> = ({
  children,
  displayBackArrow = false,
  href: _href,
  src,
  rightContent,
  onClick,
  hideSeparator = false,
  preferHistoryBack = false,
}) => {
  const image = src ? cropped(src, { width: 60, height: 60 }) : null
  const href = _href ? sanitizeRedirect(_href) : null

  const handleClick = (e: React.MouseEvent) => {
    if (preferHistoryBack && window.history.length > 1) {
      e.preventDefault()
      window.history.back()
    }

    onClick?.()
  }

  return (
    <>
      <Flex height={50} alignItems="center">
        <Flex
          flex={1}
          flexDirection="row"
          alignItems="center"
          {...(href
            ? {
                as: RouterLink,
                to: href,
                textDecoration: "none",
                onClick: handleClick,
              }
            : {
                ...(onClick || (preferHistoryBack && displayBackArrow)
                  ? {
                      as: Clickable,
                      onClick: handleClick,
                    }
                  : {}),
              })}
        >
          {displayBackArrow && (
            <ChevronLeftIcon height={14} mr={1} title="" aria-hidden />
          )}

          {image && (
            <Box flexShrink={0} mr={1} borderRadius="50%" overflow="hidden">
              <Image
                src={image.src}
                srcSet={image.srcSet}
                width={30}
                height={30}
                alt=""
                lazyLoad
              />
            </Box>
          )}

          <Text variant="xs" lineHeight={1} lineClamp={2}>
            {children}
          </Text>
        </Flex>

        {rightContent}
      </Flex>

      {!hideSeparator && (
        <FullBleed>
          <Separator as="hr" color="mono15" />
        </FullBleed>
      )}
    </>
  )
}
