/**
 * @generated SignedSource<<67cf8cf2042a638b027a809028a06c59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type auctionsRoutes_Past_AuctionsQuery$variables = Record<
  PropertyKey,
  never
>
export type auctionsRoutes_Past_AuctionsQuery$data = {
  readonly viewer:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"PastAuctions_viewer">
      }
    | null
    | undefined
}
export type auctionsRoutes_Past_AuctionsQuery = {
  response: auctionsRoutes_Past_AuctionsQuery$data
  variables: auctionsRoutes_Past_AuctionsQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      kind: "Literal",
      name: "auctionState",
      value: "CLOSED",
    },
    {
      kind: "Literal",
      name: "first",
      value: 10,
    },
    {
      kind: "Literal",
      name: "live",
      value: false,
    },
    {
      kind: "Literal",
      name: "sort",
      value: "TIMELY_AT_NAME_DESC",
    },
  ]
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "auctionsRoutes_Past_AuctionsQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Viewer",
          kind: "LinkedField",
          name: "viewer",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "PastAuctions_viewer",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "auctionsRoutes_Past_AuctionsQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Viewer",
          kind: "LinkedField",
          name: "viewer",
          plural: false,
          selections: [
            {
              alias: null,
              args: v0 /*: any*/,
              concreteType: "SaleConnection",
              kind: "LinkedField",
              name: "salesConnection",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "totalCount",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "SaleEdge",
                  kind: "LinkedField",
                  name: "edges",
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: "Sale",
                      kind: "LinkedField",
                      name: "node",
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "slug",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "name",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "href",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "endAt",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "id",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "__typename",
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "cursor",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "PageInfo",
                  kind: "LinkedField",
                  name: "pageInfo",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "endCursor",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "hasNextPage",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey:
                'salesConnection(auctionState:"CLOSED",first:10,live:false,sort:"TIMELY_AT_NAME_DESC")',
            },
            {
              alias: null,
              args: v0 /*: any*/,
              filters: ["live", "sort", "auctionState"],
              handle: "connection",
              key: "PastAuctions_salesConnection",
              kind: "LinkedHandle",
              name: "salesConnection",
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "46bb0e0722b4aa51b398920560cb2028",
      id: null,
      metadata: {},
      name: "auctionsRoutes_Past_AuctionsQuery",
      operationKind: "query",
      text: "query auctionsRoutes_Past_AuctionsQuery {\n  viewer {\n    ...PastAuctions_viewer\n  }\n}\n\nfragment PastAuctions_viewer on Viewer {\n  salesConnection(first: 10, live: false, sort: TIMELY_AT_NAME_DESC, auctionState: CLOSED) {\n    totalCount\n    edges {\n      node {\n        slug\n        name\n        href\n        endAt\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    },
  }
})()
;(node as any).hash = "a53e63540ff1c718c6966e6d9fa92698"

export default node
