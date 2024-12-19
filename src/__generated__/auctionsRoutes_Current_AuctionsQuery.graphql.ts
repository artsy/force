/**
 * @generated SignedSource<<8b7f775c0e29031d25f350f8e7d1cccb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type auctionsRoutes_Current_AuctionsQuery$variables = Record<
  PropertyKey,
  never
>
export type auctionsRoutes_Current_AuctionsQuery$data = {
  readonly viewer:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"CurrentAuctions_viewer">
      }
    | null
    | undefined
}
export type auctionsRoutes_Current_AuctionsQuery = {
  response: auctionsRoutes_Current_AuctionsQuery$data
  variables: auctionsRoutes_Current_AuctionsQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      kind: "Literal",
      name: "auctionState",
      value: "OPEN",
    },
    {
      kind: "Literal",
      name: "first",
      value: 10,
    },
    {
      kind: "Literal",
      name: "live",
      value: true,
    },
    {
      kind: "Literal",
      name: "published",
      value: true,
    },
    {
      kind: "Literal",
      name: "sort",
      value: "LICENSED_TIMELY_AT_NAME_DESC",
    },
  ]
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "auctionsRoutes_Current_AuctionsQuery",
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
              name: "CurrentAuctions_viewer",
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
      name: "auctionsRoutes_Current_AuctionsQuery",
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
                          name: "liveStartAt",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "isLiveOpen",
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
                'salesConnection(auctionState:"OPEN",first:10,live:true,published:true,sort:"LICENSED_TIMELY_AT_NAME_DESC")',
            },
            {
              alias: null,
              args: v0 /*: any*/,
              filters: ["live", "published", "sort", "auctionState"],
              handle: "connection",
              key: "CurrentAuctions_salesConnection",
              kind: "LinkedHandle",
              name: "salesConnection",
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "52e1b248618f45749cb9dca9c6b6118b",
      id: null,
      metadata: {},
      name: "auctionsRoutes_Current_AuctionsQuery",
      operationKind: "query",
      text: "query auctionsRoutes_Current_AuctionsQuery {\n  viewer {\n    ...CurrentAuctions_viewer\n  }\n}\n\nfragment CurrentAuctions_viewer on Viewer {\n  salesConnection(first: 10, live: true, published: true, sort: LICENSED_TIMELY_AT_NAME_DESC, auctionState: OPEN) {\n    totalCount\n    edges {\n      node {\n        slug\n        name\n        href\n        liveStartAt\n        isLiveOpen\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    },
  }
})()

;(node as any).hash = "0f6f7844ff78f10ce5fccb61d11c9007"

export default node
