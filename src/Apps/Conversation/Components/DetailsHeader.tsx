import { FC } from "react"
import * as React from "react"
import {
  CloseIcon,
  Flex,
  Text,
  StackableBorderBox,
  Box,
  InfoCircleIcon,
  Clickable,
  themeProps,
} from "@artsy/palette"

import { LARGE_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

export interface DetailsProps {
  showDetails: boolean
  setShowDetails: (boolean) => void
}

interface DetailsHeaderProps extends DetailsProps {}

export const DetailsHeader: FC<DetailsHeaderProps> = props => {
  const { showDetails, setShowDetails } = props
  const isMobile =
    __internal__useMatchMedia(themeProps.mediaQueries.xs) ||
    __internal__useMatchMedia(themeProps.mediaQueries.sm)

  if (isMobile) {
    return null
  }

  return (
    <StackableBorderBox
      p={0}
      flexDirection="column"
      width={showDetails ? "376px" : "0"}
      maxWidth={showDetails ? "auto" : "0"}
      {...props}
      borderTop="none !important"
      borderBottom="none !important"
    >
      <Flex
        flexDirection="row"
        height={LARGE_SCREEN_HEADER_HEIGHT}
        justifyContent="space-between"
        alignItems="flex-end"
        pb={1}
      >
        <Text variant="sm-display" ml={2}>
          Details
        </Text>
        <CloseIcon
          mr={1}
          mt={0.5}
          cursor="pointer"
          onClick={() => setShowDetails(false)}
        />
      </Flex>
    </StackableBorderBox>
  )
}

export const DetailIcon: React.FC<DetailsProps> = props => {
  const { showDetails, setShowDetails } = props
  const isXL = __internal__useMatchMedia(themeProps.mediaQueries.xl)

  // When opened, DetailsSidebar is positioned on top of the messages (on XL
  // layouts only). In those cases, DetailsHeader is redundant with DetailIcon
  if (showDetails && isXL) {
    return null
  }

  return (
    <Box>
      <Flex flexDirection="row" alignItems="center" pr={1}>
        <InfoCircleIcon />
        <Clickable cursor="pointer" textDecoration="underline">
          <Text
            ml={1}
            variant="sm"
            onClick={() => {
              setShowDetails(!showDetails)
            }}
          >
            Details
          </Text>
        </Clickable>
      </Flex>
    </Box>
  )
}
