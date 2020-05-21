import { getDate } from "v2/Components/Publishing/Constants"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"

import {
  FeatureArticle,
  NewsArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { HeaderText, NewsPanel } from "../NewsPanel"

it("Renders article headlines", () => {
  const wrapper = mount(<NewsPanel articles={[NewsArticle, FeatureArticle]} />)
  expect(wrapper.text()).toMatch(NewsArticle.title)
  expect(wrapper.text()).toMatch(FeatureArticle.title)
})

it("Links headlines to article", () => {
  const wrapper = mount(<NewsPanel articles={[NewsArticle, FeatureArticle]} />)
  expect(wrapper.html()).toMatch(`/news/${NewsArticle.slug}`)
  expect(wrapper.html()).toMatch(`/news/${FeatureArticle.slug}`)
})

it("Renders the date correctly in the News Panel Header", () => {
  const wrapper = mount(<NewsPanel articles={[NewsArticle, FeatureArticle]} />)
  const today = getDate(new Date().toISOString(), "monthDay")

  expect(
    wrapper
      .find(HeaderText)
      .first()
      .text()
  ).toBe(today)
})
