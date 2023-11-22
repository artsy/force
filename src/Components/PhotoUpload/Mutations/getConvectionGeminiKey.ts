import { fetchQuery, graphql } from "react-relay"
import { getConvectionGeminiKeyQuery } from "__generated__/getConvectionGeminiKeyQuery.graphql"
import { Environment } from "react-relay"

export const getConvectionGeminiKey = (relayEnvironment: Environment) =>
  fetchQuery<getConvectionGeminiKeyQuery>(
    relayEnvironment,
    graphql`
      query getConvectionGeminiKeyQuery {
        system {
          services {
            convection {
              geminiTemplateKey
            }
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: "network-only",
    }
  )
    .toPromise()
    .then(data => data?.system?.services?.convection.geminiTemplateKey)
