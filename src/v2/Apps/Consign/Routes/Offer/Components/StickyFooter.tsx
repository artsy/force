import * as React from "react";

import { Flex, Link, Sans, Spacer } from "@artsy/palette"

export const StickyFooter: React.FC = () => {
  return (
    <Flex
      position="fixed"
      bottom={0}
      left={0}
      height="46px"
      width="100%"
      borderTop="1px solid"
      borderColor="black10"
      alignItems="center"
      justifyContent="center"
      backgroundColor="white100"
    >
      <Sans size="2" color="black60">
        Need help? <Link href="mailto:consign@artsy.net">Ask a question</Link>.
      </Sans>
      <Spacer mb={2} />
    </Flex>
  )
}
