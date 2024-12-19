/**
 * @generated SignedSource<<f3a9c7473141c08a711973f8c467366d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type ArtistTargetSupplyPriority =
  | "FALSE"
  | "TRUE"
  | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type MyCollectionArtworkSubmitForSale_artwork$data = {
  readonly artist:
    | {
        readonly internalID: string
        readonly slug: string
        readonly targetSupply: {
          readonly priority: ArtistTargetSupplyPriority | null | undefined
        }
      }
    | null
    | undefined
  readonly consignmentSubmission:
    | {
        readonly internalID: string | null | undefined
      }
    | null
    | undefined
  readonly internalID: string
  readonly marketPriceInsights:
    | {
        readonly demandRank: number | null | undefined
      }
    | null
    | undefined
  readonly " $fragmentType": "MyCollectionArtworkSubmitForSale_artwork"
}
export type MyCollectionArtworkSubmitForSale_artwork$key = {
  readonly " $data"?: MyCollectionArtworkSubmitForSale_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSubmitForSale_artwork">
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "internalID",
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "MyCollectionArtworkSubmitForSale_artwork",
    selections: [
      v0 /*: any*/,
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
          v0 /*: any*/,
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
            concreteType: "ArtistTargetSupply",
            kind: "LinkedField",
            name: "targetSupply",
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "priority",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: "artist(shallow:true)",
      },
      {
        alias: null,
        args: null,
        concreteType: "ArtworkConsignmentSubmission",
        kind: "LinkedField",
        name: "consignmentSubmission",
        plural: false,
        selections: [v0 /*: any*/],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "ArtworkPriceInsights",
        kind: "LinkedField",
        name: "marketPriceInsights",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "demandRank",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "Artwork",
    abstractKey: null,
  }
})()

;(node as any).hash = "0e370e1833994a59ef5448336ac29407"

export default node
