import { EmailPanel } from "v2/Components/Publishing/Email/EmailPanel"
import { RelatedPanel } from "v2/Components/Publishing/Fixtures/Components"
import { RelatedArticlesPanel } from "v2/Components/Publishing/RelatedArticles/Panel/RelatedArticlesPanel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Sidebar } from "../Sidebar"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

it("renders related articles", () => {
  const sidebar = mount(<Sidebar relatedArticlesForPanel={RelatedPanel} />)
  expect(sidebar.find(RelatedArticlesPanel).length).toBe(1)
})

it("renders email signup", () => {
  const sidebar = mount(<Sidebar emailSignupUrl="artsy.net" />)
  expect(sidebar.find(EmailPanel).length).toBe(1)
})
