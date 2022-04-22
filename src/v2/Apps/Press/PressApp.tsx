import { Text, Spacer, GridColumns, Column } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { PressApp_page } from "v2/__generated__/PressApp_page.graphql"
import { PageHTML } from "../Page/Components/PageHTML"

interface PressAppProps {
  page: PressApp_page
}

const PressApp: FC<PressAppProps> = ({ page }) => {
  if (!page.content) return null

  return (
    <>
      <MetaTags title={`${page.name} | Artsy`} />

      <Spacer mt={4} />

      <Text variant="xl">Artsy Press</Text>

      <Text variant="xl" color="black60">
        Contact{" "}
        <a href="mailto:press@artsy.net" style={{ textDecoration: "none" }}>
          press@artsy.net
        </a>
      </Text>

      <Spacer mt={4} />

      <RouteTabs fill>
        <RouteTab to="/press2/in-the-media">Artsy in the Media</RouteTab>

        <RouteTab to="/press2/press-releases">
          News &amp; Press Releases
        </RouteTab>
      </RouteTabs>

      <Spacer mt={4} />

      <GridColumns gridRowGap={4}>
        <Column span={8} start={3}>
          <PageHTML dangerouslySetInnerHTML={{ __html: page.content }} />
        </Column>
      </GridColumns>
    </>
  )
}

export const PressAppFragmentContainer = createFragmentContainer(PressApp, {
  page: graphql`
    fragment PressApp_page on Page {
      internalID
      name
      content(format: HTML)
    }
  `,
})
