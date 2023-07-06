export const visitWithStatusRetries = (
  url: string,
  options?: Partial<Cypress.VisitOptions>
) => {
  cy.visit(url, {
    ...options,
    retryOnStatusCodeFailure: true,
    retryOnNetworkFailure: true,
  })
}
