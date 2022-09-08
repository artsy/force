describe("/terms", () => {
  it("renders a markdown page of terms and conditions", () => {
    cy.visit("/terms")
    cy.contains("These Terms of Use")
  })
})

describe("mobile", () => {
  before(() => {
    cy.viewport("iphone-x")
  })

  describe("/terms", () => {
    it("renders a markdown page of terms and conditions", () => {
      cy.visit("/terms")
      cy.contains("These Terms of Use")
    })
  })
})
