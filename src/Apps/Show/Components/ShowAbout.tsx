import { Box, type BoxProps, Text } from "@artsy/palette"
import type { ShowAbout_show$data } from "__generated__/ShowAbout_show.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ShowAboutProps extends BoxProps {
  show: ShowAbout_show$data
}
export const ShowAbout: React.FC<React.PropsWithChildren<ShowAboutProps>> = ({
  show: { about },
  ...rest
}) => {
  if (!about) {
    return null
  }

  return (
    <Box {...rest}>
      {about && (
        <>
          <Text variant="xs" as="h3" mb={1}>
            About
          </Text>

          <Text variant="sm" as="p">
            {about}
          </Text>
        </>
      )}
    </Box>
  )
}
export const ShowAboutFragmentContainer = createFragmentContainer(ShowAbout, {
  show: graphql`
    fragment ShowAbout_show on Show {
      about: description
    }
  `,
})
