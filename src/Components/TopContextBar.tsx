import * as React from "react"
import {
  Box,
  Flex,
  FullBleed,
  Separator,
  Text,
  Image,
  Clickable,
} from "@artsy/palette"
import { cropped } from "Utils/resized"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { sanitizeURL } from "Utils/sanitizeURL"
import { RouterLink } from "System/Components/RouterLink"

export interface TopContextBarProps {
  displayBackArrow?: boolean
  href?: string | null
  /** Should the biggest size image available */
  src?: string | null
  rightContent?: React.ReactNode
  onClick?(): void
  hideSeparator?: boolean
}

export const TopContextBar: React.FC<TopContextBarProps> = ({
  children,
  displayBackArrow = false,
  href: _href,
  src,
  rightContent,
  onClick,
  hideSeparator = false,
}) => {
  const image = src ? cropped(src, { width: 60, height: 60 }) : null
  const href = _href ? sanitizeURL(_href, { enforceInternal: true }) : null

  return (
    <>
      <Flex
        height={50}
        alignItems="center"
        {...(href
          ? {
              as: RouterLink,
              to: href,
              textDecoration: "none",
              onClick,
            }
          : {
              ...(onClick
                ? {
                    as: Clickable,
                    onClick,
                  }
                : {}),
            })}
      >
        <Flex flex={1} flexDirection="row" alignItems="center">
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
          <Separator as="hr" color="black15" />
        </FullBleed>
      )}
    </>
  )
}
