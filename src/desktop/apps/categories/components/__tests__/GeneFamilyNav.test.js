import React from "react"
import { render } from "enzyme"
import GeneFamilyNav from "../GeneFamilyNav"

describe("GeneFamilyNav", () => {
  let rendered
  let geneFamilies

  beforeEach(() => {
    geneFamilies = [
      {
        id: 123,
        slug: "materials",
        name: "Materials",
        genes: [
          /* … */
        ],
      },
      {
        id: 456,
        slug: "styles",
        name: "Styles",
        genes: [
          /* … */
        ],
      },
    ]
    rendered = render(<GeneFamilyNav geneFamilies={geneFamilies} />)
  })

  it("renders links for each family", () => {
    rendered.find("a").length.should.equal(2)
    rendered.find("a").eq(0).text().should.equal("Materials")
    rendered.find("a").eq(1).text().should.equal("Styles")
  })
})
