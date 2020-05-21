import {
  ClassicArticle,
  FeatureArticle,
  StandardArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import { Header } from "../Header"
import { ClassicHeader } from "../Layouts/ClassicHeader"
import { FeatureHeader } from "../Layouts/FeatureHeader"
import { StandardHeader } from "../Layouts/StandardHeader"

describe("Header", () => {
  const getWrapper = headerProps => {
    return mount(<Header {...headerProps} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: cloneDeep(ClassicArticle),
    }
  })

  it("Renders classic header by default", () => {
    delete props.article.layout
    const component = getWrapper(props)
    expect(component.find(ClassicHeader)).toHaveLength(1)
  })

  it("Renders classic header if classic layout", () => {
    delete props.article.layout
    const component = getWrapper(props)
    expect(component.find(ClassicHeader)).toHaveLength(1)
  })

  it("Renders feature header if feature layout", () => {
    props.article = FeatureArticle
    const component = getWrapper(props)
    expect(component.find(FeatureHeader)).toHaveLength(1)
  })

  it("Renders standard header if standard layout", () => {
    props.article = StandardArticle
    const component = getWrapper(props)
    expect(component.find(StandardHeader)).toHaveLength(1)
  })
})
