/**
 * @generated SignedSource<<90b4fb3371ece9871e071ad271a54c9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type RelatedCollectionEntity_collection$data = {
  readonly artworksConnection:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly artist:
                          | {
                              readonly name: string | null | undefined
                            }
                          | null
                          | undefined
                        readonly image:
                          | {
                              readonly resized:
                                | {
                                    readonly height: number | null | undefined
                                    readonly src: string
                                    readonly srcSet: string
                                    readonly width: number | null | undefined
                                  }
                                | null
                                | undefined
                            }
                          | null
                          | undefined
                        readonly title: string | null | undefined
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
  readonly headerImage: string | null | undefined
  readonly id: string
  readonly priceGuidance: number | null | undefined
  readonly slug: string
  readonly title: string
  readonly " $fragmentType": "RelatedCollectionEntity_collection"
}
export type RelatedCollectionEntity_collection$key = {
  readonly " $data"?: RelatedCollectionEntity_collection$data
  readonly " $fragmentSpreads": FragmentRefs<"RelatedCollectionEntity_collection">
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "title",
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "RelatedCollectionEntity_collection",
    selections: [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "headerImage",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "slug",
        storageKey: null,
      },
      v0 /*: any*/,
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
        name: "priceGuidance",
        storageKey: null,
      },
      {
        alias: null,
        args: [
          {
            kind: "Literal",
            name: "aggregations",
            value: ["TOTAL"],
          },
          {
            kind: "Literal",
            name: "first",
            value: 3,
          },
          {
            kind: "Literal",
            name: "sort",
            value: "-decayed_merch",
          },
        ],
        concreteType: "FilterArtworksConnection",
        kind: "LinkedField",
        name: "artworksConnection",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "FilterArtworksEdge",
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
                selections: [
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
                        name: "name",
                        storageKey: null,
                      },
                    ],
                    storageKey: "artist(shallow:true)",
                  },
                  v0 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    concreteType: "Image",
                    kind: "LinkedField",
                    name: "image",
                    plural: false,
                    selections: [
                      {
                        alias: null,
                        args: [
                          {
                            kind: "Literal",
                            name: "height",
                            value: 150,
                          },
                          {
                            kind: "Literal",
                            name: "width",
                            value: 150,
                          },
                        ],
                        concreteType: "ResizedImageUrl",
                        kind: "LinkedField",
                        name: "resized",
                        plural: false,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "width",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "height",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "src",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "srcSet",
                            storageKey: null,
                          },
                        ],
                        storageKey: "resized(height:150,width:150)",
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
        storageKey:
          'artworksConnection(aggregations:["TOTAL"],first:3,sort:"-decayed_merch")',
      },
    ],
    type: "MarketingCollection",
    abstractKey: null,
  }
})()

;(node as any).hash = "e3c10a2a28073906f2519bea2afa57b2"

export default node
