import { FC } from "react"
import * as React from "react"
import {
  Flex,
  Text,
  StackableBorderBox,
  Box,
  InfoCircleIcon,
  Clickable,
} from "@artsy/palette"
import { LARGE_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"
import { Media } from "Utils/Responsive"
import CloseIcon from "@artsy/icons/CloseIcon"

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

          <Clickable onClick={() => setShowDetails(false)}>
            <CloseIcon mr={1} mt={0.5} />
          </Clickable>
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
        <Clickable
          textDecoration="underline"
          onClick={() => {
            setShowDetails(!showDetails)
          }}
        >
          <Text ml={1} variant="sm">
            Details
          </Text>
        </Clickable>
      </Flex>
    </Box>
  )
}
