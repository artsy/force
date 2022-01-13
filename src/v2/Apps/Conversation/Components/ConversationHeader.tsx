import { FC } from "react"
import {
  ArrowLeftIcon,
  Box,
  Flex,
  Text,
  Separator,
  breakpoints,
} from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { RouterLink } from "v2/System/Router/RouterLink"
import { DetailIcon, DetailsProps } from "./DetailsHeader"

export const LARGE_SCREEN_HEADER_HEIGHT = "85px"
export const SMALL_SCREEN_HEADER_HEIGHT = "55px"

const SmallConversationHeaderContainer = styled(Flex)`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${themeGet("colors.black10")};
  background: white;
  z-index: 1;

  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`

const LargeConversationHeaderContainer = styled(Flex)`
  display: none;

  @media (min-width: ${breakpoints.md}) {
    display: initial;
  }
`

export const ConversationHeader: FC<ConversationHeaderProps> = props => {
  const { partnerName, showDetails, setShowDetails } = props
  return (
    <>
      <SmallConversationHeader
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        partnerName={partnerName}
      />
      <LargeConversationHeader
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        partnerName={partnerName}
      />
    </>
  )
}

interface ConversationHeaderProps extends DetailsProps {
  partnerName: string
}

const SmallConversationHeader: FC<ConversationHeaderProps> = props => {
  const { partnerName, showDetails, setShowDetails } = props
  return (
    <SmallConversationHeaderContainer
      height={SMALL_SCREEN_HEADER_HEIGHT}
      flexShrink={0}
      px={[1, 1, 1, 2]}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <RouterLink to={`/user/conversations`}>
        <ArrowLeftIcon />
      </RouterLink>
      <Text variant="md" display={["none", "none", "auto"]}>
        Conversation with {partnerName}
      </Text>
      <Text variant="md" display={["auto", "auto", "none"]}>
        Inquiry with {partnerName}
      </Text>
      <DetailIcon showDetails={showDetails} setShowDetails={setShowDetails} />
    </SmallConversationHeaderContainer>
  )
}

const LargeConversationHeader: FC<ConversationHeaderProps> = props => {
  const { partnerName, showDetails, setShowDetails } = props
  return (
    <LargeConversationHeaderContainer
      flexDirection="column"
      width="100%"
      justifyContent="flex-end"
    >
      <Flex
        justifyContent="space-between"
        alignItems="flex-end"
        height={LARGE_SCREEN_HEADER_HEIGHT}
        pb={1}
        mt="auto"
      >
        <Box>
          {partnerName ? (
            <Text variant="md" mb={0.5} ml={2}>
              Conversation with {partnerName}
            </Text>
          ) : (
            <>{props.children}</>
          )}
        </Box>
        <DetailIcon showDetails={showDetails} setShowDetails={setShowDetails} />
      </Flex>
      <Separator />
    </LargeConversationHeaderContainer>
  )
}
