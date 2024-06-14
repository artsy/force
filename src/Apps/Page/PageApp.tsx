import { Column, GridColumns, Spacer } from "@artsy/palette"
import { FC, useMemo, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ContextModule } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"
import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { PageApp_page$data } from "__generated__/PageApp_page.graphql"
import { PageHTML } from "./Components/PageHTML"
import {
  TOP_LEVEL_PAGE_SLUG_ALLOWLIST,
  PAGE_SLUGS_WITH_AUTH_REQUIRED,
} from "./pageRoutes"
import { HttpError } from "found"
import { userIsAdmin } from "Utils/user"

interface PageAppProps {
  page: PageApp_page$data
}

const PageApp: FC<PageAppProps> = ({ page }) => {
  const { user } = useSystemContext()
  const isAdmin = userIsAdmin(user)
  const { showAuthDialog } = useAuthDialog()
  const { match } = useRouter()

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

  useEffect(() => {
    if (PAGE_SLUGS_WITH_AUTH_REQUIRED.includes(page.internalID) && !user?.id) {
      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to view ${page.name}`
          },
          redirectTo: match.location.pathname,
        },
        analytics: {
          contextModule: ContextModule.header,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, user])

  const canonical = TOP_LEVEL_PAGE_SLUG_ALLOWLIST.includes(match.params.id)
    ? `/${match.params.id}`
    : `/page/${match.params.id}`

  if (!page.published && !isAdmin) throw new HttpError(404)

  if (!page.content) return null

  if (PAGE_SLUGS_WITH_AUTH_REQUIRED.includes(page.internalID) && !user?.id)
    return null

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
      content(format: HTML)
      name
      published
    }
  `,
})
