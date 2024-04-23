describe("/terms", () => {
  it("renders a markdown page of terms and conditions", () => {
    cy.visit("/terms")
    cy.contains("These General Terms and Conditions of Sale")
  })
})

describe("mobile", () => {
  before(() => {
    cy.viewport("iphone-x")
  })

  describe("/terms", () => {
    it("renders a markdown page of terms and conditions", () => {
      cy.visit("/terms")
      cy.contains("These General Terms and Conditions of Sale")
    })
  })
})
