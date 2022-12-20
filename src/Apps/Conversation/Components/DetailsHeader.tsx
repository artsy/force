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
} from "@artsy/palette"

import { LARGE_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"
import { Media } from "Utils/Responsive"

export interface DetailsProps {
  showDetails: boolean
  setShowDetails: (boolean) => void
}

interface DetailsHeaderProps extends DetailsProps {}

export const DetailsHeader: FC<DetailsHeaderProps> = props => {
  const { showDetails, setShowDetails } = props
  return (
    <Media greaterThan="sm">
      <StackableBorderBox
        p={0}
        flexDirection="column"
        width={showDetails ? "376px" : "0"}
        maxWidth={showDetails ? "auto" : "0"}
        {...props}
        borderTop="none !important"
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
    </Media>
  )
}

export const DetailIcon: React.FC<DetailsProps> = props => {
  const { showDetails, setShowDetails } = props
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
