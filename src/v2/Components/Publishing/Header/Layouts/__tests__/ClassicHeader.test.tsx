import {
  ClassicArticle,
  ClassicArticleManyAuthors,
  ClassicArticlePromotedContent,
} from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import { ClassicHeader } from "../ClassicHeader"
import { ClassicPromotedContent } from "../Components/ClassicPromotedContent"

describe("Classic Header", () => {
  describe("Snapshots", () => {
    it("renders properly", () => {
      const snapshot = renderer
        .create(<ClassicHeader article={ClassicArticle} />)
        .toJSON()
      expect(snapshot).toMatchSnapshot()
    })

    it("renders promoted content properly", () => {
      const snapshot = renderer
        .create(<ClassicHeader article={ClassicArticlePromotedContent} />)
        .toJSON()
      expect(snapshot).toMatchSnapshot()
    })

    it("renders editable props properly", () => {
      const snapshot = renderer
        .create(
          <ClassicHeader
            article={ClassicArticle}
            date="2015-06-19T13:09:18.567Z"
            editLeadParagraph={EditableChild("Lead Paragraph")}
            editTitle={EditableChild("Title")}
          />
        )
        .toJSON()
      expect(snapshot).toMatchSnapshot()
    })
  })

  describe("Unit", () => {
    let props
    const getWrapper = (_props = props) => {
      return mount(<ClassicHeader {..._props} />)
    }

    beforeEach(() => {
      props = {
        article: cloneDeep(ClassicArticle),
      }
    })

    it("Renders title", () => {
      const component = getWrapper()
      expect(component.text()).toMatch(ClassicArticle.title)
      expect(component.text()).toMatch(ClassicArticle.author.name)
    })

    it("Renders lead paragraph", () => {
      const component = getWrapper()
      expect(component.text()).toMatch("Critics were skeptical of Bambi")
    })

    it("Renders author", () => {
      const component = getWrapper()
      expect(component.text()).toMatch(ClassicArticle.author.name)
    })

    it("Renders contributing authors", () => {
      props.article = ClassicArticleManyAuthors
      const component = getWrapper()
      expect(component.text()).toMatch(ClassicArticle.author.name)
      expect(component.text()).toMatch(
        "By First Author, Second Author and Third Author"
      )
    })

    it("Renders promoted content header", () => {
      props.article = ClassicArticlePromotedContent
      const component = getWrapper()
      expect(component.find(ClassicPromotedContent)).toHaveLength(1)
      expect(component.find(ClassicPromotedContent).text()).toMatch(
        "Promoted Content"
      )
    })

    describe("Editing", () => {
      it("Renders editable title", () => {
        props.editTitle = EditableChild("Title")
        const component = getWrapper()
        expect(component.text()).toMatch("Child Title")
      })

      it("Renders lead paragraph", () => {
        props.editLeadParagraph = EditableChild("Lead Paragraph")
        const component = getWrapper()
        expect(component.text()).toMatch("Child Lead Paragraph")
      })

      it("Renders a custom date", () => {
        props.date = "2017-05-19T13:09:18.567Z"
        const component = getWrapper()
        expect(component.text()).toMatch("May 19, 2017 9:09am")
      })
    })
  })
})
