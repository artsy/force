import { Column, GridColumns, Spacer } from "@artsy/palette"
import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Router/useRouter"
import { PageApp_page$data } from "__generated__/PageApp_page.graphql"
import { PageHTML } from "./Components/PageHTML"
import { TOP_LEVEL_PAGE_SLUG_ALLOWLIST } from "./pageRoutes"

interface PageAppProps {
  page: PageApp_page$data
}

const PageApp: FC<PageAppProps> = ({ page }) => {
  const description = useMemo(() => {
    switch (page.internalID) {
      case "terms":
      case "past-terms":
      case "past-terms-10-29-12":
        return "The following Terms of Use is an agreement between you and Artsy, Inc. that governs your use of the Artsy website, mobile phone and tablet applications, and any related services we provide."
      case "privacy":
        return "The following Privacy Policy describes how Artsy, Inc. may use any personal information that we collect or receive from you when you use the Artsy website, mobile phone and tablet applications, and any related services we provide."
      case "security":
        return "We take security very seriously. This document addresses issues related to the security of artsy.net, our users and services."
    }
  }, [page.internalID])

  const { match } = useRouter()

  const canonical = TOP_LEVEL_PAGE_SLUG_ALLOWLIST.includes(match.params.id)
    ? `/${match.params.id}`
    : `/page/${match.params.id}`

  if (!page.content) return null

  return (
    <>
      <MetaTags
        title={`${page.name} | Artsy`}
        description={description}
        pathname={canonical}
      />

      <Spacer y={4} />

      <GridColumns gridRowGap={4}>
        <Column span={8} start={3}>
          <PageHTML dangerouslySetInnerHTML={{ __html: page.content }} />
        </Column>
      </GridColumns>
    </>
  )
}

export const PageAppFragmentContainer = createFragmentContainer(PageApp, {
  page: graphql`
    fragment PageApp_page on Page {
      internalID
      name
      content(format: HTML)
    }
  `,
})
