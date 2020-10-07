import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowApp_show } from "v2/__generated__/ShowApp_show.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { Box, Separator, Text } from "@artsy/palette"
import { ShowMetaFragmentContainer as ShowMeta } from "v2/Apps/Show/components/ShowMeta"
import { ShowInstallShotsFragmentContainer as ShowInstallShots } from "./components/ShowInstallShots"
import { ShowContextualLinkFragmentContainer as ShowContextualLink } from "./components/ShowContextualLink"
import styled from "styled-components"

interface ShowAppProps {
  show: ShowApp_show
}

const FullScreenSeparator = styled(Separator)`
  left: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  position: relative;
  right: 50%;
  width: 100vw;
`

export const ShowApp: React.FC<ShowAppProps> = ({ show }) => {
  if (!show) return <ErrorPage code={404} />

  return (
    <>
      <ShowMeta show={show} />

      <AppContainer>
        <HorizontalPadding>
          <Box my={2}>
            <ShowContextualLink show={show} />
            <FullScreenSeparator as="hr" my={2} />
          </Box>

          <ShowInstallShots show={show} my={2} />

          <Text as="h1" variant="largeTitle" my={4}>
            {show.name}
          </Text>

          <Separator as="hr" my={3} />

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(ShowApp, {
  show: graphql`
    fragment ShowApp_show on Show {
      name
      ...ShowContextualLink_show
      ...ShowMeta_show
      ...ShowInstallShots_show
    }
  `,
})
