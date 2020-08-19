import React, { FC } from "react"
import styled from "styled-components"
import {
  ArrowLeftIcon,
  Box,
  CloseIcon,
  Flex,
  FlexProps,
  Icon,
  Path,
  Sans,
  Separator,
  Title,
  color,
} from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"

const LARGE_SCREEN_HEADER_HEIGHT = "85px"
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

export const ConversationPanelHeader: FC<ConversationHeaderProps> = props => {
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

interface DetailsProps {
  showDetails: boolean
  setShowDetails: (boolean) => void
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

export const EmptyInboxHeader: FC<{}> = () => {
  return (
    <Flex
      height={LARGE_SCREEN_HEADER_HEIGHT}
      px={2}
      py={1}
      alignItems="flex-end"
      borderBottom={`1px solid ${color("black10")}`}
    >
      <Sans size="6" weight="medium">
        Inbox
      </Sans>
    </Flex>
  )
}

export const ConversationListHeader: FC = props => {
  return (
    <Flex
      justifyContent="flex-end"
      flexDirection="column"
      height={LARGE_SCREEN_HEADER_HEIGHT}
      {...props}
    >
      <Sans size="6" weight="medium" ml={1}>
        Inbox
      </Sans>
      <Separator mt={1} />
    </Flex>
  )
}

interface DetailsHeaderProps extends BorderedFlexProps, DetailsProps {}

export const DetailsHeader: FC<DetailsHeaderProps> = props => {
  const { showDetails, setShowDetails } = props
  return (
    <Flex
      flexDirection="column"
      width={showDetails ? "375px" : "0"}
      maxWidth={showDetails ? "auto" : "0"}
      pb={1}
      display={["none", "flex"]}
      {...props}
    >
      <Flex
        flexDirection="row"
        height={LARGE_SCREEN_HEADER_HEIGHT}
        justifyContent="space-between"
        alignItems="flex-end"
        pb={1}
      >
        <Sans size="4" ml={2}>
          Details
        </Sans>
        <CloseIcon
          mr={1}
          mt={0.5}
          cursor="pointer"
          onClick={() => setShowDetails(false)}
        />
      </Flex>
      <Separator />
    </Flex>
  )
}

const DetailIcon: React.FC<DetailsProps> = props => {
  const { showDetails, setShowDetails } = props
  return (
    // TODO: Fix <Icon /> typings in Palette
    // @ts-ignore
    <StatefulIcon
      width="28"
      height="28"
      viewBox="0 0 28 28"
      mr={[0, 0, 0, 1]}
      onClick={() => {
        setShowDetails(!showDetails)
      }}
      active={showDetails}
    >
      <Title>Show details</Title>
      <Path
        d="M6.5 21.5V6.5H16L16 21.5H6.5ZM17.5 21.5H21.5V6.5H17.5L17.5 21.5ZM5 5.5C5 5.22386 5.22386 5 5.5 5H22.5C22.7761 5 23 5.22386 23 5.5V22.5C23 22.7761 22.7761 23 22.5 23H5.5C5.22386 23 5 22.7761 5 22.5V5.5Z"
        fill={color("black100")}
        fillRule="evenodd"
      />
    </StatefulIcon>
  )
}

const StatefulIcon = styled(Icon)<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? color("black30") : "")};
  cursor: pointer;
`
