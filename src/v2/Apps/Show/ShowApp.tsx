import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Separator } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { ShowApp_show } from "v2/__generated__/ShowApp_show.graphql"
import { ShowMetaFragmentContainer as ShowMeta } from "v2/Apps/Show/components/ShowMeta"
import { ShowHeaderFragmentContainer as ShowHeader } from "./components/ShowHeader"
import { ShowAboutFragmentContainer as ShowAbout } from "./components/ShowAbout"
import { ShowInstallShotsFragmentContainer as ShowInstallShots } from "./components/ShowInstallShots"
import { ShowViewingRoom } from "./components/ShowViewingRoom"
import { Break, Col, Grid } from "v2/Components/FluidGrid"

interface ShowAppProps {
  show: ShowApp_show
}

export const ShowApp: React.FC<ShowAppProps> = ({ show }) => {
  if (!show) return <ErrorPage code={404} />

  const hasViewingRoom = true // TODO
  const hasAbout = !!show.about || !!show.pressRelease

  return (
    <>
      <ShowMeta show={show} />

      <AppContainer>
        <HorizontalPadding>
          <ShowInstallShots show={show} my={2} />

          <Grid>
            {!hasAbout && !hasViewingRoom && (
              <Col span={[12, 8, 6]}>
                <ShowHeader show={show} />
              </Col>
            )}

            {hasAbout && !hasViewingRoom && (
              <>
                <Col span={6}>
                  <ShowHeader show={show} />
                </Col>

                <Col span={6}>
                  <ShowAbout show={show} />
                </Col>
              </>
            )}

            {!hasAbout && hasViewingRoom && (
              <>
                <Col span={6}>
                  <ShowHeader show={show} />
                </Col>

                <Col span={1} display={["none", "block"]} />

                <Col span={5}>
                  <ShowViewingRoom />
                </Col>
              </>
            )}

            {hasAbout && hasViewingRoom && (
              <>
                <Col span={[12, 8, 6]}>
                  <ShowHeader show={show} />
                </Col>

                <Break />

                <>
                  <Col span={6}>
                    <ShowAbout show={show} />
                  </Col>

                  <Col span={1} display={["none", "block"]} />

                  <Col span={5}>
                    <ShowViewingRoom />
                  </Col>
                </>
              </>
            )}
          </Grid>

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
      about: description
      pressRelease
      ...ShowHeader_show
      ...ShowAbout_show
      ...ShowMeta_show
      ...ShowInstallShots_show
    }
  `,
})
