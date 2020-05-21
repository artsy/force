import "jest-styled-components"

import { mount } from "enzyme"
import React from "react"

import Events from "../../../Utils/Events"
import { Article } from "../Article"
import { getArticleFullHref } from "../Constants"
import { StandardArticle } from "../Fixtures/Articles"

jest.mock("../ToolTip/TooltipsDataLoader", () => ({
  TooltipsData: props => props.children,
}))

// TODO: Revisit once we’ve settled on a good react-tracking pattern in Reaction
xit("emits analytics events to an event emitter", done => {
  const article = mount(<Article article={StandardArticle} />)
  Events.onEvent(data => {
    expect(data.action).toEqual("Click")
    expect(data.type).toEqual("share")
    done()
  })
  const shareUrl = getArticleFullHref(StandardArticle.slug)
  const fbURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`
  article
    .find(`[href='${fbURL}']`)
    .first()
    .simulate("click")
})
