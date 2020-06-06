import {
  EntityHeader,
  Flex,
  FlexProps,
  Separator,
  color,
  media,
} from "@artsy/palette"
import React, { FC } from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { Details_conversation } from "v2/__generated__/Details_conversation.graphql"

export const DETAIL_BOX_ANIMATION = `transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
const DETAIL_BOX_XS_ANIMATION = `transition: opacity 0.3s, z-index 0.3s;`
const DETAIL_BOX_MD_ANIMATION = `transition: transform 0.3s;`

// in XS screens transition is animated with `opacity`. z-index: -1 is also needed when showDetail is false
// in XL screen it is animated with `width` because animation needs to push the mid column content
// in S/M/L screens it is animated with `translate` for better performance (than `width`)
const DetailsContainer = styled(Flex)<{ opacity?: 0 | 1; transform?: string }>`
  border-left: 1px solid ${color("black10")};
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${color("white100")};
  transform: none;
  ${DETAIL_BOX_ANIMATION}
  ${media.xl`
    transform: ${({ transform }) => transform};
    ${DETAIL_BOX_MD_ANIMATION}
    z-index: 0;
  `}
  ${media.xs`
    ${DETAIL_BOX_XS_ANIMATION}
    transform: none;
    opacity: ${({ opacity }) => opacity};
    top: 114px;
  `}
`

interface DetailsProps extends FlexProps {
  conversation: Details_conversation
  showDetails: boolean
}

export const Details: FC<DetailsProps> = ({ conversation, ...props }) => {
  return (
    <DetailsContainer
      flexDirection="column"
      justifyContent="flex-start"
      height="100%"
      flexShrink={0}
      position={["absolute", "absolute", "absolute", "absolute", "static"]}
      right={[0, 0, 0, 0, "auto"]}
      width={
        props.showDetails ? "376px" : ["376px", "376px", "376px", "376px", "0"]
      }
      opacity={props.showDetails ? 1 : 0}
      transform={props.showDetails ? "translateX(0)" : "translateX(376px)"}
      zIndex={props.showDetails ? 1 : -1}
      {...props}
    >
      <EntityHeader
        px={2}
        py={1}
        name={conversation.to.name}
        initials={conversation.to.initials}
      />
      <Separator />
    </DetailsContainer>
  )
}

export const DetailsFragmentContainer = createFragmentContainer(Details, {
  conversation: graphql`
    fragment Details_conversation on Conversation
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 30 }
        after: { type: "String" }
      ) {
      to {
        name
        initials
      }
    }
  `,
})
