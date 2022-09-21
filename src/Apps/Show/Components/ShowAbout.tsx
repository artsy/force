import * as React from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowAbout_show$data } from "__generated__/ShowAbout_show.graphql"

interface ShowAboutProps extends BoxProps {
  show: ShowAbout_show$data
}
export const ShowAbout: React.FC<ShowAboutProps> = ({
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
