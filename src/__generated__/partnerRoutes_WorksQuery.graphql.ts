/**
 * @generated SignedSource<<c377a578ac71403e7f08cee67b873f2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
export type partnerRoutes_WorksQuery$variables = {
  partnerId: string
}
export type partnerRoutes_WorksQuery$data = {
  readonly partner:
    | {
        readonly counts:
          | {
              readonly eligibleArtworks: any | null | undefined
            }
          | null
          | undefined
        readonly displayWorksSection: boolean | null | undefined
      }
    | null
    | undefined
}
export type partnerRoutes_WorksQuery = {
  response: partnerRoutes_WorksQuery$data
  variables: partnerRoutes_WorksQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "partnerId",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "partnerId",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "displayWorksSection",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      concreteType: "PartnerCounts",
      kind: "LinkedField",
      name: "counts",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "eligibleArtworks",
          storageKey: null,
        },
      ],
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "partnerRoutes_WorksQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Partner",
          kind: "LinkedField",
          name: "partner",
          plural: false,
          selections: [v2 /*: any*/, v3 /*: any*/],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "partnerRoutes_WorksQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Partner",
          kind: "LinkedField",
          name: "partner",
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "02b84d612184a45dedb92df750f52ed4",
      id: null,
      metadata: {},
      name: "partnerRoutes_WorksQuery",
      operationKind: "query",
      text: "query partnerRoutes_WorksQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    displayWorksSection\n    counts {\n      eligibleArtworks\n    }\n    id\n  }\n}\n",
    },
  }
})()
;(node as any).hash = "bedbde95d2fc14d2036cea1a8c2dec36"

export default node
