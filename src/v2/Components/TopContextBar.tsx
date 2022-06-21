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
import { RouterLink } from "v2/System/Router/RouterLink"
import { cropped } from "v2/Utils/resized"

export interface TopContextBarProps {
  displayBackArrow?: boolean
  href?: string | null
  /** Should the biggest size image available */
  src?: string | null
  onClick?(): void
}

export const TopContextBar: React.FC<TopContextBarProps> = ({
  children,
  displayBackArrow = false,
  href,
  src,
  onClick,
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
      >
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

      <FullBleed>
        <Separator as="hr" color="black15" />
      </FullBleed>
    </>
  )
}
