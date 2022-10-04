import { Environment, fetchQuery, graphql } from "relay-runtime"
import { getConvectionGeminiKeyQuery } from "__generated__/getConvectionGeminiKeyQuery.graphql"

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
    .then(data => data?.system!.services!.convection.geminiTemplateKey)
