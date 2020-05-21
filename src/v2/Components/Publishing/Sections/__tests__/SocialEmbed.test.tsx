import {
  SocialEmbedInstagram,
  SocialEmbedTwitter,
} from "v2/Components/Publishing/Fixtures/Components"
import { mount } from "enzyme"
import "jest-styled-components"
import jsonp from "jsonp"
import { defer } from "lodash"
import React from "react"
import { SocialEmbed, SocialEmbedProps } from "../SocialEmbed"

jest.mock("jsonp", () => jest.fn())
jest.mock("isomorphic-fetch")

declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () =>
      Promise.resolve({
        html: "<blockquote>Instagram</blockquote>",
      }),
  })
)

describe("Social Embed", () => {
  beforeEach(() => {
    jsonp.mockClear()
    global.fetch.mockClear()
  })

  it("fetches and embeds instagram html", done => {
    const component = mount(<SocialEmbed section={SocialEmbedInstagram} />)
    expect(global.fetch.mock.calls[0][0]).toMatch("api.instagram.com")

    defer(() => {
      expect(component.find(SocialEmbed).html()).toMatch(
        "<blockquote>Instagram</blockquote>"
      )
      done()
    }, 10)
  })

  it("fetches and embeds twitter html", () => {
    const response = { html: "<blockquote>Twitter</blockquote>" }
    const component = mount(<SocialEmbed section={SocialEmbedTwitter} />)
    expect(jsonp.mock.calls[0][0]).toMatch("publish.twitter.com")
    jsonp.mock.calls[0][1](null, response)
    expect(component.find(SocialEmbed).html()).toMatch(response.html)
  })

  it("renders nothing if url is invalid", () => {
    const section: SocialEmbedProps["section"] = {
      url: "",
      type: "social_embed",
      layout: "column_width",
    }
    const component = mount(<SocialEmbed section={section} />)
    expect(jsonp.mock.calls.length).toEqual(0)
    expect(component.find(SocialEmbed).html()).toBeNull()
  })
})
