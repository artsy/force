export const artworkGridRenders = () => {
  cy.get("div[data-test='artworkGrid']").should("have.length.of", 1)
  cy.get("div[data-test='artworkGridItem']").should(
    "have.length.of.at.least",
    1
  )
}
