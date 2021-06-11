import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"
// import { getSingleEntity } from "utils/getSingleEntity"

// TODO: Needs TEST_USER and TEST_PASSWORD configured in order to generate
// access token for querying metaphysics for a single viewing room.
// Reference integrity's code for the logic.
describe.skip("Viewing Room", () => {
  let viewingRoom: any
  before(() => {
    // getSingleEntity("viewing-room").then(res => {
    //   viewingRoom = res
    // })
  })

  it("/viewing-rooms/:id", () => {
    // Title as rendered in HTML preserves extra whitespace
    const inPageTitle = viewingRoom.title.trim()
    // Title when used for page title does not preserve consecutive whitespace
    const browserTitle = viewingRoom.title.trim().replace(/\s\s+/g, " ")
    visitWithStatusRetries(`viewing-room/${viewingRoom.slug}`)

    cy.get("h1").should("contain", inPageTitle)
    cy.title().should("contain", browserTitle)
  })
})
