import * as React from "react"
import {
  Box,
  ChevronIcon,
  Flex,
  FullBleed,
  Separator,
  Text,
  Image,
} from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { cropped } from "Utils/resized"

export interface TopContextBarProps {
  displayBackArrow?: boolean
  href?: string | null
  redirectTo?: string | undefined
  /** Should the biggest size image available */
  src?: string | null
  rightContent?: React.ReactNode
  onClick?(): void
  hideSeparator?: boolean
}

export const TopContextBar: React.FC<TopContextBarProps> = ({
  children,
  displayBackArrow = false,
  href,
  redirectTo,
  src,
  rightContent,
  onClick,
  hideSeparator = false,
}) => {
  const image = src ? cropped(src, { width: 60, height: 60 }) : null

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
          : {})}
        {...(redirectTo
          ? {
              as: RouterLink,
              textDecoration: "none",
              onClick,
            }
          : {})}
      >
        <Flex flex={1} flexDirection="row" alignItems="center">
          {displayBackArrow && (
            <ChevronIcon
              direction="left"
              height={14}
              mr={1}
              title=""
              aria-hidden
            />
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
