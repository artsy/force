import React from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowAbout_show } from "v2/__generated__/ShowAbout_show.graphql"
import { ForwardLink } from "v2/Components/Links/ForwardLink"

interface ShowAboutProps extends BoxProps {
  show: ShowAbout_show
}
export const ShowAbout: React.FC<ShowAboutProps> = ({
  show: { about, pressRelease, href },
  ...rest
}) => {
  if (!about || !pressRelease) {
    return null
  }

  return (
    <Box {...rest}>
      {about && (
        <>
          <Text variant="mediumText" as="h3" mb={1}>
            About
          </Text>

          <Text variant="subtitle" as="p">
            {about}
          </Text>
        </>
      )}

      {pressRelease && (
        <ForwardLink to={`${href}/info`} mt={2}>
          More info
        </ForwardLink>
      )}
    </Box>
  )
}
export const ShowAboutFragmentContainer = createFragmentContainer(ShowAbout, {
  show: graphql`
    fragment ShowAbout_show on Show {
      about: description
      pressRelease
      href
    }
  `,
})
