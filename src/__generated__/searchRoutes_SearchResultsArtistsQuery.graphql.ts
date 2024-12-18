/**
 * @generated SignedSource<<f215dcd34cf08058c8c594d9c5c0070a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type searchRoutes_SearchResultsArtistsQuery$variables = {
  keyword: string
  page?: number | null | undefined
}
export type searchRoutes_SearchResultsArtistsQuery$data = {
  readonly viewer:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsArtists_viewer">
      }
    | null
    | undefined
}
export type searchRoutes_SearchResultsArtistsQuery = {
  response: searchRoutes_SearchResultsArtistsQuery$data
  variables: searchRoutes_SearchResultsArtistsQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "keyword",
      },
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "page",
      },
    ],
    v1 = {
      kind: "Variable",
      name: "page",
      variableName: "page",
    },
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "cursor",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "page",
      storageKey: null,
    },
    v4 = [
      v2 /*: any*/,
      v3 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "isCurrent",
        storageKey: null,
      },
    ],
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "searchRoutes_SearchResultsArtistsQuery",
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
              args: [
                v1 /*: any*/,
                {
                  kind: "Variable",
                  name: "term",
                  variableName: "keyword",
                },
              ],
              kind: "FragmentSpread",
              name: "SearchResultsArtists_viewer",
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
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "searchRoutes_SearchResultsArtistsQuery",
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
              args: [
                {
                  kind: "Literal",
                  name: "entities",
                  value: ["ARTIST"],
                },
                {
                  kind: "Literal",
                  name: "first",
                  value: 10,
                },
                v1 /*: any*/,
                {
                  kind: "Variable",
                  name: "query",
                  variableName: "keyword",
                },
              ],
              concreteType: "SearchableConnection",
              kind: "LinkedField",
              name: "searchConnection",
              plural: false,
              selections: [
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
                      name: "hasNextPage",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "PageCursors",
                  kind: "LinkedField",
                  name: "pageCursors",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: "PageCursor",
                      kind: "LinkedField",
                      name: "around",
                      plural: true,
                      selections: v4 /*: any*/,
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "PageCursor",
                      kind: "LinkedField",
                      name: "first",
                      plural: false,
                      selections: v4 /*: any*/,
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "PageCursor",
                      kind: "LinkedField",
                      name: "last",
                      plural: false,
                      selections: v4 /*: any*/,
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "PageCursor",
                      kind: "LinkedField",
                      name: "previous",
                      plural: false,
                      selections: [v2 /*: any*/, v3 /*: any*/],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "SearchableEdge",
                  kind: "LinkedField",
                  name: "edges",
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: null,
                      kind: "LinkedField",
                      name: "node",
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "__typename",
                          storageKey: null,
                        },
                        {
                          kind: "InlineFragment",
                          selections: [
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
                              name: "internalID",
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
                              name: "bio",
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: "ScalarField",
                              name: "imageUrl",
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: "Artwork",
                              kind: "LinkedField",
                              name: "coverArtwork",
                              plural: false,
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: "Image",
                                  kind: "LinkedField",
                                  name: "image",
                                  plural: false,
                                  selections: [
                                    {
                                      alias: "src",
                                      args: [
                                        {
                                          kind: "Literal",
                                          name: "version",
                                          value: ["square"],
                                        },
                                      ],
                                      kind: "ScalarField",
                                      name: "url",
                                      storageKey: 'url(version:["square"])',
                                    },
                                  ],
                                  storageKey: null,
                                },
                                v5 /*: any*/,
                              ],
                              storageKey: null,
                            },
                          ],
                          type: "Artist",
                          abstractKey: null,
                        },
                        {
                          kind: "InlineFragment",
                          selections: [v5 /*: any*/],
                          type: "Node",
                          abstractKey: "__isNode",
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "b98bff32a83f654b7fd43a61def114c1",
      id: null,
      metadata: {},
      name: "searchRoutes_SearchResultsArtistsQuery",
      operationKind: "query",
      text: 'query searchRoutes_SearchResultsArtistsQuery(\n  $keyword: String!\n  $page: Int\n) {\n  viewer {\n    ...SearchResultsArtists_viewer_2zsz5P\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SearchResultsArtists_viewer_2zsz5P on Viewer {\n  searchConnection(query: $keyword, first: 10, page: $page, entities: [ARTIST]) @principalField {\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        __typename\n        ... on Artist {\n          name\n          internalID\n          href\n          bio\n          imageUrl\n          coverArtwork {\n            image {\n              src: url(version: ["square"])\n            }\n            id\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n',
    },
  }
})()
;(node as any).hash = "ad8ae6a5cdaa083306637b64734c8d7c"

export default node
