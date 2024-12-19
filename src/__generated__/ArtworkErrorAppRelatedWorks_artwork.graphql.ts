/**
 * @generated SignedSource<<b2c60486ab4c9684fd5d2c6c22d777e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkErrorAppRelatedWorks_artwork$data = {
  readonly layer:
    | {
        readonly artworksConnection:
          | {
              readonly edges:
                | ReadonlyArray<
                    | {
                        readonly node:
                          | {
                              readonly slug: string
                            }
                          | null
                          | undefined
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined
              readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">
            }
          | null
          | undefined
        readonly name: string | null | undefined
      }
    | null
    | undefined
  readonly slug: string
  readonly " $fragmentType": "ArtworkErrorAppRelatedWorks_artwork"
}
export type ArtworkErrorAppRelatedWorks_artwork$key = {
  readonly " $data"?: ArtworkErrorAppRelatedWorks_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkErrorAppRelatedWorks_artwork">
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "slug",
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "ArtworkErrorAppRelatedWorks_artwork",
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: "ArtworkLayer",
        kind: "LinkedField",
        name: "layer",
        plural: false,
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
            args: [
              {
                kind: "Literal",
                name: "first",
                value: 8,
              },
            ],
            concreteType: "ArtworkConnection",
            kind: "LinkedField",
            name: "artworksConnection",
            plural: false,
            selections: [
              {
                args: null,
                kind: "FragmentSpread",
                name: "ArtworkGrid_artworks",
              },
              {
                alias: null,
                args: null,
                concreteType: "ArtworkEdge",
                kind: "LinkedField",
                name: "edges",
                plural: true,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "Artwork",
                    kind: "LinkedField",
                    name: "node",
                    plural: false,
                    selections: [v0 /*: any*/],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
            storageKey: "artworksConnection(first:8)",
          },
        ],
        storageKey: null,
      },
    ],
    type: "PartialArtwork",
    abstractKey: null,
  }
})()

;(node as any).hash = "3f8ad06472e0e0af9e656b0e7516b689"

export default node
