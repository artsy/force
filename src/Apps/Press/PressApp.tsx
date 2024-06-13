import { Text, Spacer, GridColumns, Column } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { PressApp_page$data } from "__generated__/PressApp_page.graphql"
import { PageHTML } from "Apps/Page/Components/PageHTML"
import { RouterLink } from "System/Components/RouterLink"

interface PressAppProps {
  page: PressApp_page$data
}

const PressApp: FC<PressAppProps> = ({ page }) => {
  if (!page.content) return null

  return (
    <>
      <MetaTags title={`${page.name} | Artsy`} />

      <Spacer y={4} />

      <Text variant="xl">Artsy Press</Text>

      <Text variant="xl" color="black60">
        Contact{" "}
        <RouterLink inline to="mailto:press@artsy.net" textDecoration={"none"}>
          press@artsy.net
        </RouterLink>
      </Text>

      <Spacer y={4} />

      <RouteTabs fill>
        <RouteTab to="/press/in-the-media">Artsy in the Media</RouteTab>

        <RouteTab to="/press/press-releases">
          News &amp; Press Releases
        </RouteTab>
      </RouteTabs>

      <Spacer y={4} />

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
