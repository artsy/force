import React, { FC } from "react"
import styled from "styled-components"
import {
  Flex,
  ArrowLeftIcon,
  color,
  Sans,
  InfoCircleIcon,
  Separator,
  FlexProps,
} from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"

interface BorderedFlexProps extends FlexProps {
  bordered?: boolean
}
const BorderedFlex = styled(Flex) <BorderedFlexProps>`
  ${props =>
    props.bordered ? `border-right: 1px solid ${color("black10")};` : ""}
  height: 100%;
`

const ConversationHeaderContainer = styled(Flex)`
  position: fixed;
  top: 59px;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${color("black10")};
  background: white;
`

interface ConversationHeaderProps {
  partnerName: string
}
export const ConversationHeader: FC<ConversationHeaderProps> = ({
  partnerName,
}) => {
  return (
    <ConversationHeaderContainer
      height="55px"
      px={2}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <RouterLink to={`/user/conversations`}>
        <ArrowLeftIcon />
      </RouterLink>
      <Sans size="3t" weight="medium">
        Conversation with {partnerName}
      </Sans>
      <InfoCircleIcon />
    </ConversationHeaderContainer>
  )
}

export const MobileInboxHeader: FC<FlexProps> = props => {
  return (
    <Flex
      justifyContent="flex-end"
      flexDirection="column"
      height="85px"
      {...props}
    >
      <Sans size="6" weight="medium" ml={1}>
        Inbox
      </Sans>
      <Separator mt={1} />
    </Flex>
  )
}

export const InboxHeader: FC<BorderedFlexProps> = props => {
  return (
    <BorderedFlex justifyContent="flex-end" flexDirection="column" {...props}>
      <Sans size="6" weight="medium" ml={1}>
        Inbox
      </Sans>
      <Separator mt={1} />
    </BorderedFlex>
  )
}

export const DetailsHeader: FC<BorderedFlexProps> = props => {
  return (
    <Flex flexDirection="column" {...props}>
      <Sans size="4" ml={2}>
        Details
      </Sans>
      <Separator mt={1} />
    </Flex>
  )
}

export const FullHeader: FC<Partial<ConversationHeaderProps>> = props => {
  return (
    <Flex
      height="85px"
      width="100%"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <InboxHeader width="375px" bordered flexShrink={0} />
      <BorderedFlex
        bordered
        flexDirection="column"
        width="100%"
        justifyContent="flex-end"
      >
        {props.partnerName ? (
          <Sans size="4" ml={2}>
            Conversation with {props.partnerName}
          </Sans>
        ) : (
            <>{props.children}</>
          )}
        <Separator mt={1} />
      </BorderedFlex>
      <Flex flexShrink={0} height="100%" alignItems="flex-end">
        <Media greaterThan="lg">
          <DetailsHeader width="375px" />
        </Media>
      </Flex>
    </Flex>
  )
}
