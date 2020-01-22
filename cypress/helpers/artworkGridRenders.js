export const artworkGridRenders = () => {
  cy.get("div[data-test='ArtworkGrid']").should("have.length.of", 1)
  cy.get("div[data-test='ArtworkGridItem']").should(
    "have.length.of.at.least",
    1
  )
}
