import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  ClassicArticle,
  ClassicArticleInternalChannel,
  ClassicArticleManyAuthors,
} from "../../Fixtures/Articles"
import { ClassicByline } from "../ClassicByline"

describe("ClassicByline", () => {
  describe("Snapshots", () => {
    it("renders a single author", () => {
      const snapshot = renderer.create(
        <ClassicByline article={ClassicArticle} />
      )
      expect(snapshot).toMatchSnapshot()
    })

    it("renders multiple authors", () => {
      const snapshot = renderer.create(
        <ClassicByline article={ClassicArticleManyAuthors} />
      )
      expect(snapshot).toMatchSnapshot()
    })

    it("renders internal channel bylines", () => {
      const snapshot = renderer.create(
        <ClassicByline article={ClassicArticleInternalChannel} />
      )
      expect(snapshot).toMatchSnapshot()
    })

    it("renders a custom date", () => {
      const snapshot = renderer.create(
        <ClassicByline
          article={ClassicArticleManyAuthors}
          date={"2017-05-19T13:09:18.567Z"}
        />
      )
      expect(snapshot).toMatchSnapshot()
    })
  })

  describe("Unit", () => {
    let props
    const getWrapper = (_props = props) => {
      return mount(<ClassicByline {..._props} />)
    }

    beforeEach(() => {
      props = {
        article: ClassicArticle,
      }
    })

    it("renders a single author", () => {
      const component = getWrapper()
      expect(component.text()).toMatch("Joanne Artman Gallery")
    })

    it("renders multiple authors", () => {
      props.article = ClassicArticleManyAuthors
      const component = getWrapper()
      expect(component.text()).toMatch("Joanne Artman Gallery")
      expect(component.text()).toMatch(
        "By First Author, Second Author and Third Author"
      )
    })

    it("renders internal channels as author", () => {
      props.article = ClassicArticleInternalChannel
      delete props.article.author
      const component = getWrapper()
      expect(component.text()).toMatch("Artsy Jobs")
    })

    it("renders published date", () => {
      const component = getWrapper()
      expect(component.text()).toMatch("Jul 28, 2017 4:38pm")
    })

    it("renders a custom date", () => {
      props.date = "2017-05-19T13:09:18.567Z"
      const component = getWrapper()
      expect(component.text()).toMatch("May 19, 2017 9:09am")
    })
  })
})
