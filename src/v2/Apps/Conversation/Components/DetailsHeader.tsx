import React, { FC } from "react"
import {
  CloseIcon,
  Flex,
  Icon,
  Path,
  Sans,
  Separator,
  Title,
} from "@artsy/palette"
import { color } from "styled-system"
import styled from "styled-components"
import { LARGE_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"

export interface DetailsProps {
  showDetails: boolean
  setShowDetails: (boolean) => void
}

interface DetailsHeaderProps extends DetailsProps {}

export const DetailsHeader: FC<DetailsHeaderProps> = props => {
  const { showDetails, setShowDetails } = props
  return (
    <Flex
      flexDirection="column"
      width={showDetails ? "375px" : "0"}
      maxWidth={showDetails ? "auto" : "0"}
      pb={1}
      display={["none", "none", "flex", "flex", "flex"]}
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

export const DetailIcon: React.FC<DetailsProps> = props => {
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
