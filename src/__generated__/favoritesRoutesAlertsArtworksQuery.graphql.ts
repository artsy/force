/**
 * @generated SignedSource<<6a2479e71ee75a4f9c58f2de8f0d4d9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type favoritesRoutesAlertsArtworksQuery$variables = Record<
  PropertyKey,
  never
>
export type favoritesRoutesAlertsArtworksQuery$data = {
  readonly me:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertsApp_me">
      }
    | null
    | undefined
}
export type favoritesRoutesAlertsArtworksQuery = {
  response: favoritesRoutesAlertsArtworksQuery$data
  variables: favoritesRoutesAlertsArtworksQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      kind: "Literal",
      name: "first",
      value: 10,
    },
    v1 = [
      v0 /*: any*/,
      {
        kind: "Literal",
        name: "sort",
        value: "ENABLED_AT_DESC",
      },
    ],
    v2 = ["artistIDs"],
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "favoritesRoutesAlertsArtworksQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "SavedSearchAlertsApp_me",
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
      name: "favoritesRoutesAlertsArtworksQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [
            {
              alias: null,
              args: v1 /*: any*/,
              concreteType: "AlertConnection",
              kind: "LinkedField",
              name: "alertsConnection",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "AlertEdge",
                  kind: "LinkedField",
                  name: "edges",
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: "Alert",
                      kind: "LinkedField",
                      name: "node",
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "internalID",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "artistIDs",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "artistSeriesIDs",
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
                          alias: "title",
                          args: [
                            {
                              kind: "Literal",
                              name: "only",
                              value: v2 /*: any*/,
                            },
                          ],
                          kind: "ScalarField",
                          name: "displayName",
                          storageKey: 'displayName(only:["artistIDs"])',
                        },
                        {
                          alias: "subtitle",
                          args: [
                            {
                              kind: "Literal",
                              name: "except",
                              value: v2 /*: any*/,
                            },
                          ],
                          kind: "ScalarField",
                          name: "displayName",
                          storageKey: 'displayName(except:["artistIDs"])',
                        },
                        {
                          alias: null,
                          args: [v0 /*: any*/],
                          concreteType: "FilterArtworksConnection",
                          kind: "LinkedField",
                          name: "artworksConnection",
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              concreteType: "FilterArtworksCounts",
                              kind: "LinkedField",
                              name: "counts",
                              plural: false,
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  kind: "ScalarField",
                                  name: "total",
                                  storageKey: null,
                                },
                              ],
                              storageKey: null,
                            },
                            v3 /*: any*/,
                          ],
                          storageKey: "artworksConnection(first:10)",
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: "AlertSettings",
                          kind: "LinkedField",
                          name: "settings",
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              kind: "ScalarField",
                              name: "name",
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                        v3 /*: any*/,
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
              storageKey: 'alertsConnection(first:10,sort:"ENABLED_AT_DESC")',
            },
            {
              alias: null,
              args: v1 /*: any*/,
              filters: ["sort"],
              handle: "connection",
              key: "SavedSearchAlertsApp_alertsConnection",
              kind: "LinkedHandle",
              name: "alertsConnection",
            },
            v3 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "dbddc17b80d8e5b722fc08f8b5b926d4",
      id: null,
      metadata: {},
      name: "favoritesRoutesAlertsArtworksQuery",
      operationKind: "query",
      text: "query favoritesRoutesAlertsArtworksQuery {\n  me {\n    ...SavedSearchAlertsApp_me\n    id\n  }\n}\n\nfragment SavedSearchAlertListItem_item on Alert {\n  internalID\n  artistIDs\n  artistSeriesIDs\n  href\n  title: displayName(only: [artistIDs])\n  subtitle: displayName(except: [artistIDs])\n  artworksConnection(first: 10) {\n    counts {\n      total\n    }\n    id\n  }\n  settings {\n    name\n  }\n}\n\nfragment SavedSearchAlertsApp_me on Me {\n  alertsConnection(first: 10, sort: ENABLED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        artistIDs\n        ...SavedSearchAlertListItem_item\n        title: displayName(only: [artistIDs])\n        subtitle: displayName(except: [artistIDs])\n        artworksConnection(first: 10) {\n          counts {\n            total\n          }\n          id\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    },
  }
})()
;(node as any).hash = "24f1c3347e149f13aab1e93f91abf79e"

export default node
