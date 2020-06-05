import { EntityHeader, Flex, FlexProps, Separator, color } from "@artsy/palette"
import React, { FC } from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { Details_conversation } from "v2/__generated__/Details_conversation.graphql"
import { Media } from "v2/Utils/Responsive"

export const DETAIL_BOX_ANIMATION = `transition: width 0.3s ;`
const DETAIL_BOX_XS_ANIMATION = `transition: opacity 0.3s;`

const DetailsContainer = styled(Flex)<{ opacity?: 0 | 1 }>`
  border-left: 1px solid ${color("black10")};
  flex-shrink: 0;
  ${DETAIL_BOX_ANIMATION}
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${color("white100")};
`
// XS screen has opacity animation instead of width
const XSDetailsContainer = styled(DetailsContainer)`
  ${DETAIL_BOX_XS_ANIMATION}
  opacity: ${({ opacity }) => opacity};
`
interface DetailsProps extends FlexProps {
  conversation: Details_conversation
  showDetails: boolean
}

export const Details: FC<DetailsProps> = ({ conversation, ...props }) => {
  const content = (
    <>
      <EntityHeader
        px={2}
        py={1}
        name={conversation.to.name}
        initials={conversation.to.initials}
      />
      <Separator />
    </>
  )

  return (
    <>
      <Media greaterThan="xs">
        <DetailsContainer
          flexDirection="column"
          justifyContent="flex-start"
          flexShrink={0}
          height="100%"
          position={["absolute", "absolute", "absolute", "absolute", "static"]}
          right={[0, 0, 0, 0, "auto"]}
          width={props.showDetails ? "376px" : "0"}
          {...props}
        >
          {content}
        </DetailsContainer>
      </Media>
      <Media at="xs">
        <XSDetailsContainer
          flexDirection="column"
          justifyContent="flex-start"
          flexShrink={0}
          height="100%"
          position="absolute"
          right={0}
          top="114px" /* FIXME: why this is needed? */
          width="376px"
          opacity={props.showDetails ? 1 : 0}
          {...props}
        >
          {content}
        </XSDetailsContainer>
      </Media>
    </>
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
