import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Author } from "../Author"

describe("Author", () => {
  const author = [{ name: "Molly Gottschalk" }]
  const authors = [
    { name: "Molly Gottschalk" },
    { name: "Casey Lesser" },
    { name: "Anna Louie Sussman" },
  ]

  describe("Snapshots", () => {
    it("Single author", () => {
      renderer.create(<Author authors={author} layout={"split"} />)
      expect(author).toMatchSnapshot()
    })

    it("Multiple authors", () => {
      renderer.create(<Author authors={authors} layout={"split"} />)
      expect(authors).toMatchSnapshot()
    })
  })

  describe("Unit", () => {
    it("renders a single author", () => {
      const component = mount(<Author authors={authors} layout={"split"} />)
      expect(component.text()).toMatch("Molly Gottschalk")
    })

    it("renders multiple authors", () => {
      const component = mount(<Author authors={authors} layout={"split"} />)

      expect(component.text()).toMatch("Molly Gottschalk")
      expect(component.text()).toMatch("Casey Lesser")
      expect(component.text()).toMatch("Anna Louie Sussman")
    })
  })
})
