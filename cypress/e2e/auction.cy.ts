import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Auction", () => {
  it("/auction/:id", () => {
    visitWithStatusRetries("auction/shared-live-mocktion-k8s")
    cy.get("h1").should("contain", "Shared Live Mocktion K8S")
    cy.title().should("contain", "Shared Live Mocktion K8S | Artsy")

    // Default sort state; ensures grid loads
    cy.get("div").should("contain", "Lot Number (asc.)")
  })

  it("/auction/:id with query params", () => {
    visitWithStatusRetries("auction/shared-live-mocktion-k8s?foo=zaz&bar=baz")
    cy.get("h1").should("contain", "Shared Live Mocktion K8S")
    cy.title().should("contain", "Shared Live Mocktion K8S | Artsy")

    // Default sort state; ensures grid loads
    cy.get("div").should("contain", "Lot Number (asc.)")
  })
})
