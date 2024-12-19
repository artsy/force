/**
 * @generated SignedSource<<df581bdf752912dff2a137fa204c85d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type SearchResultsArtists_viewer$data = {
  readonly searchConnection:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly bio?: string | null | undefined
                        readonly coverArtwork?:
                          | {
                              readonly image:
                                | {
                                    readonly src: string | null | undefined
                                  }
                                | null
                                | undefined
                            }
                          | null
                          | undefined
                        readonly href?: string | null | undefined
                        readonly imageUrl?: string | null | undefined
                        readonly internalID?: string
                        readonly name?: string | null | undefined
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
        readonly pageCursors: {
          readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">
        }
        readonly pageInfo: {
          readonly hasNextPage: boolean
        }
      }
    | null
    | undefined
  readonly " $fragmentType": "SearchResultsArtists_viewer"
}
export type SearchResultsArtists_viewer$key = {
  readonly " $data"?: SearchResultsArtists_viewer$data
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsArtists_viewer">
}

const node: ReaderFragment = {
  argumentDefinitions: [
    {
      defaultValue: 10,
      kind: "LocalArgument",
      name: "first",
    },
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "page",
    },
    {
      defaultValue: "",
      kind: "LocalArgument",
      name: "term",
    },
  ],
  kind: "Fragment",
  metadata: null,
  name: "SearchResultsArtists_viewer",
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
          kind: "Variable",
          name: "first",
          variableName: "first",
        },
        {
          kind: "Variable",
          name: "page",
          variableName: "page",
        },
        {
          kind: "Variable",
          name: "query",
          variableName: "term",
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
              args: null,
              kind: "FragmentSpread",
              name: "Pagination_pageCursors",
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
                      ],
                      storageKey: null,
                    },
                  ],
                  type: "Artist",
                  abstractKey: null,
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
  type: "Viewer",
  abstractKey: null,
}

;(node as any).hash = "a0b364b18c2a3f33247daa6aac2639c0"

export default node
