import { Byline } from "v2/Components/Publishing/Byline/Byline"
import { FeatureArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import {
  FeatureInnerContent,
  FeatureInnerSubContent,
} from "../FeatureInnerContent"

describe("FeatureInnerContent", () => {
  const getWrapper = passedProps => {
    return mount(<FeatureInnerContent {...passedProps} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: cloneDeep(FeatureArticle),
    }
  })

  it("Renders vertical", () => {
    const component = getWrapper(props)
    expect(component.text()).toMatch(FeatureArticle.vertical.name)
  })

  it("Renders title", () => {
    const component = getWrapper(props)
    expect(component.text()).toMatch(FeatureArticle.title)
  })

  it("Renders FeatureInnerSubContent", () => {
    const component = getWrapper(props)
    expect(component.find(FeatureInnerSubContent)).toHaveLength(1)
  })

  describe("Editing", () => {
    it("Renders editVertical if no vertical", () => {
      delete props.article.vertical
      props.editVertical = EditableChild("Vertical")
      const component = getWrapper(props)
      expect(component.text()).toMatch("Child Vertical")
    })

    it("Renders editTitle", () => {
      props.editTitle = EditableChild("Title")
      const component = getWrapper(props)
      expect(component.text()).toMatch("Child Title")
    })
  })
})

describe("FeatureInnerSubContent", () => {
  const getWrapper = passedProps => {
    return mount(<FeatureInnerSubContent {...passedProps} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: cloneDeep(FeatureArticle),
    }
  })

  it("Renders deck", () => {
    const component = getWrapper(props)
    expect(component.text()).toMatch("Lorem Ipsum")
  })

  it("Renders byline", () => {
    const component = getWrapper(props)
    expect(component.text()).toMatch("Casey Lesser")
    expect(component.find(Byline)).toHaveLength(1)
  })

  describe("Editing", () => {
    it("Renders editDeck", () => {
      props.editDeck = EditableChild("Deck")
      const component = getWrapper(props)
      expect(component.text()).toMatch("Child Deck")
    })

    it("Renders custom date", () => {
      props.date = "2015-06-19T13:09:18.567Z"
      const component = getWrapper(props)
      expect(component.text()).toMatch("Jun 19, 2015 9:09am")
    })
  })
})
