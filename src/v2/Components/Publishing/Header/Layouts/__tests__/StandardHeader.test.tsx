import {
  MissingVerticalStandardArticle,
  StandardArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import { StandardHeader } from "../StandardHeader"

describe("Standard Header", () => {
  describe("Snapshots", () => {
    it("renders properly", () => {
      const snapshot = renderer
        .create(<StandardHeader article={StandardArticle} />)
        .toJSON()
      expect(snapshot).toMatchSnapshot()
    })

    it("renders editable props properly", () => {
      const snapshot = renderer
        .create(
          <StandardHeader
            article={MissingVerticalStandardArticle}
            date="2015-06-19T13:09:18.567Z"
            editTitle={EditableChild("Title")}
            editVertical={EditableChild("Vertical")}
          />
        )
        .toJSON()
      expect(snapshot).toMatchSnapshot()
    })
  })

  describe("Unit", () => {
    const getWrapper = passedProps => {
      return mount(<StandardHeader {...passedProps} />)
    }

    let props
    beforeEach(() => {
      props = {
        article: cloneDeep(StandardArticle),
      }
    })

    it("Renders vertical", () => {
      const component = getWrapper(props)
      expect(component.text()).toMatch(StandardArticle.vertical.name)
    })

    it("Can handle missing vertical", () => {
      props.article = MissingVerticalStandardArticle
      const component = getWrapper(props)
      expect(component.text()).toMatch(StandardArticle.title)
    })

    it("Renders title", () => {
      const component = getWrapper(props)
      expect(component.text()).toMatch(StandardArticle.title)
    })

    it("Renders author", () => {
      const component = getWrapper(props)
      expect(component.text()).toMatch("Casey Lesser")
    })

    it("Handles missing author", () => {
      delete props.article.authors
      const component = getWrapper(props)
      expect(component.text()).toMatch("Artsy Editors")
    })

    it("Renders multiple authors", () => {
      props.article.authors.push({
        id: "523783258b3b815f7100055a",
        name: "Molly Gottshalk",
      })
      const component = getWrapper(props)
      expect(component.text()).toMatch("Casey Lesser and Molly Gottshalk")
    })

    describe("Editing", () => {
      it("Renders editable title", () => {
        props.editTitle = EditableChild("Title")
        const component = getWrapper(props)
        expect(component.text()).toMatch("Child Title")
      })

      it("Renders vertical", () => {
        props.article = MissingVerticalStandardArticle
        props.editVertical = EditableChild("Vertical")
        const component = getWrapper(props)
        expect(component.text()).toMatch("Vertical")
      })

      it("Renders a custom date", () => {
        props.date = "2017-05-19T13:09:18.567Z"
        const component = getWrapper(props)
        expect(component.text()).toMatch("May 19, 2017 9:09am")
      })
    })
  })
})
