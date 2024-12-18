/**
 * @generated SignedSource<<93f14d32f460fe2d32cb159efe29c627>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkRelatedArtists_artwork$data = {
  readonly artist:
    | {
        readonly href: string | null | undefined
        readonly related:
          | {
              readonly artistsConnection:
                | {
                    readonly edges:
                      | ReadonlyArray<
                          | {
                              readonly node:
                                | {
                                    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">
                                  }
                                | null
                                | undefined
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined
                    readonly pageInfo: {
                      readonly hasNextPage: boolean
                    }
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  readonly slug: string
  readonly " $fragmentType": "ArtworkRelatedArtists_artwork"
}
export type ArtworkRelatedArtists_artwork$key = {
  readonly " $data"?: ArtworkRelatedArtists_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkRelatedArtists_artwork">
}

const node: ReaderFragment = {
  argumentDefinitions: [
    {
      defaultValue: 6,
      kind: "LocalArgument",
      name: "count",
    },
    {
      defaultValue: "",
      kind: "LocalArgument",
      name: "cursor",
    },
  ],
  kind: "Fragment",
  metadata: {
    connection: [
      {
        count: "count",
        cursor: "cursor",
        direction: "forward",
        path: ["artist", "related", "artistsConnection"],
      },
    ],
  },
  name: "ArtworkRelatedArtists_artwork",
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
      args: [
        {
          kind: "Literal",
          name: "shallow",
          value: true,
        },
      ],
      concreteType: "Artist",
      kind: "LinkedField",
      name: "artist",
      plural: false,
      selections: [
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
          concreteType: "ArtistRelatedData",
          kind: "LinkedField",
          name: "related",
          plural: false,
          selections: [
            {
              alias: "artistsConnection",
              args: [
                {
                  kind: "Literal",
                  name: "kind",
                  value: "MAIN",
                },
              ],
              concreteType: "ArtistConnection",
              kind: "LinkedField",
              name: "__ArtworkRelatedArtists_artistsConnection_connection",
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
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "endCursor",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "ArtistEdge",
                  kind: "LinkedField",
                  name: "edges",
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: "Artist",
                      kind: "LinkedField",
                      name: "node",
                      plural: false,
                      selections: [
                        {
                          args: null,
                          kind: "FragmentSpread",
                          name: "EntityHeaderArtist_artist",
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
              ],
              storageKey:
                '__ArtworkRelatedArtists_artistsConnection_connection(kind:"MAIN")',
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: "artist(shallow:true)",
    },
  ],
  type: "Artwork",
  abstractKey: null,
}
;(node as any).hash = "ae5a3f875701f629a5613031d9fdd2a7"

export default node
