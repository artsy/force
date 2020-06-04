import { EntityHeader, Flex, FlexProps, Separator, color } from "@artsy/palette"
import React, { FC } from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { Details_conversation } from "v2/__generated__/Details_conversation.graphql"

export const DETAIL_BOX_ANIMATION = `transition: width 0.2s ease-in-out;`

const BorderedFlex = styled(Flex)`
  border-left: 1px solid ${color("black10")};
  flex-shrink: 0;
  margin-left: -1px;
  ${DETAIL_BOX_ANIMATION}
  height: 100%;
  background-color: ${color("white100")};
`

interface DetailsProps extends FlexProps {
  conversation: Details_conversation
}

export const Details: FC<DetailsProps> = ({ conversation, ...props }) => {
  return (
    <BorderedFlex
      flexDirection="column"
      justifyContent="flex-start"
      flexShrink={0}
      position={["absolute", "absolute", "absolute", "absolute", "static"]}
      right={[0, 0, 0, 0, "auto"]}
      {...props}
    >
      <EntityHeader
        px={2}
        py={1}
        name={conversation.to.name}
        initials={conversation.to.initials}
      />
      <Separator />
    </BorderedFlex>
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
