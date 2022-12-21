import { FC } from "react"
import { ArrowLeftIcon, Box, Flex, Text, Separator } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { RouterLink } from "System/Router/RouterLink"
import { DetailIcon, DetailsProps } from "./DetailsHeader"
import { Media } from "Utils/Responsive"

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
`

export const ConversationHeader: FC<ConversationHeaderProps> = props => {
  const { partnerName, showDetails, setShowDetails } = props
  return (
    <>
      <Media lessThan="md">
        <SmallConversationHeader
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          partnerName={partnerName}
        />
      </Media>
      <Media greaterThanOrEqual="md">
        <LargeConversationHeader
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          partnerName={partnerName}
        />
      </Media>
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
      <Text variant="sm-display" display={["none", "none", "auto"]}>
        Conversation with {partnerName}
      </Text>
      <Text variant="sm-display" display={["auto", "auto", "none"]}>
        Inquiry with {partnerName}
      </Text>
      <DetailIcon showDetails={showDetails} setShowDetails={setShowDetails} />
    </SmallConversationHeaderContainer>
  )
}

const LargeConversationHeader: FC<ConversationHeaderProps> = props => {
  const { partnerName, showDetails, setShowDetails } = props
  return (
    <Flex flexDirection="column" width="100%" justifyContent="flex-end">
      <Flex
        justifyContent="space-between"
        alignItems="flex-end"
        height={LARGE_SCREEN_HEADER_HEIGHT}
        pb={1}
        mt="auto"
      >
        <Box>
          {partnerName ? (
            <Text variant="sm-display" mb={0.5} ml={2}>
              Conversation with {partnerName}
            </Text>
          ) : (
            <>{props.children}</>
          )}
        </Box>
        <Media lessThan="xl">
          <DetailIcon
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />
        </Media>
        {/* When opened, DetailsSidebar is positioned on top of the messages (on XL
        layouts only). In those cases, DetailsHeader is redundant with DetailIcon */}
        <Media at="xl">
          {!showDetails && (
            <DetailIcon
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
          )}
        </Media>
      </Flex>
      <Separator />
    </Flex>
  )
}
