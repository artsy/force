import { Flex, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

export const ConversationNewMessageMarker: React.FC<
  React.PropsWithChildren<unknown>
> = () => (
  <Separator alignItems="center" my={1}>
    <Text color="mono60">New</Text>
  </Separator>
)

const Separator = styled(Flex)`
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${themeGet("colors.mono10")};
  }

  &:not(:empty)::before {
    margin-right: 45px;
  }

  &:not(:empty)::after {
    margin-left: 45px;
  }
`
