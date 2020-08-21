import React, { FC } from "react"
import styled from "styled-components"
import {
  ArrowLeftIcon,
  Box,
  Flex,
  FlexProps,
  Sans,
  Separator,
  color,
} from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { DetailIcon, DetailsProps } from "./DetailsHeader"

export const LARGE_SCREEN_HEADER_HEIGHT = "85px"
const SMALL_SCREEN_HEADER_HEIGHT = "55px"

interface BorderedFlexProps extends FlexProps {
  bordered?: boolean
}
const BorderedFlex = styled(Flex)<BorderedFlexProps>`
  ${props =>
    props.bordered ? `border-right: 1px solid ${color("black10")};` : ""}
  height: 100%;
`

const SmallConversationHeaderContainer = styled(Flex)`
  position: fixed;
  top: 59px;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${color("black10")};
  background: white;
  z-index: 1;
`

export const ConversationHeader: FC<ConversationHeaderProps> = props => {
  const { partnerName, showDetails, setShowDetails } = props
  return (
    <>
      <Media between={["xs", "md"]}>
        <SmallConversationHeader
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          partnerName={partnerName}
        />
      </Media>
      <Media greaterThan="sm">
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
      px={[1, 1, 1, 2]}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <RouterLink to={`/user/conversations`}>
        <ArrowLeftIcon />
      </RouterLink>
      <Sans size="3t" weight="medium" display={["none", "none", "auto"]}>
        Conversation with {partnerName}
      </Sans>
      <Sans size="3t" weight="medium" display={["auto", "auto", "none"]}>
        Inquiry with {partnerName}
      </Sans>
      <DetailIcon showDetails={showDetails} setShowDetails={setShowDetails} />
    </SmallConversationHeaderContainer>
  )
}

const LargeConversationHeader: FC<ConversationHeaderProps> = props => {
  const { partnerName, showDetails, setShowDetails } = props
  return (
    <BorderedFlex
      bordered
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
            <Sans size="4" ml={2}>
              Conversation with {partnerName}
            </Sans>
          ) : (
            <>{props.children}</>
          )}
        </Box>
        <DetailIcon showDetails={showDetails} setShowDetails={setShowDetails} />
      </Flex>
      <Separator />
    </BorderedFlex>
  )
}
