export const visitWithStatusRetries = url => {
  cy.visit(url, { retryOnStatusCodeFailure: true, retryOnNetworkFailure: true })
}
