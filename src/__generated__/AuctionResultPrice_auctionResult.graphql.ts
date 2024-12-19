/**
 * @generated SignedSource<<11e699b805353a7e2ac255e5de6fe4c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type AuctionResultPrice_auctionResult$data = {
  readonly boughtIn: boolean | null | undefined
  readonly currency: string | null | undefined
  readonly estimate:
    | {
        readonly display: string | null | undefined
      }
    | null
    | undefined
  readonly isUpcoming: boolean | null | undefined
  readonly performance:
    | {
        readonly mid: string | null | undefined
      }
    | null
    | undefined
  readonly priceRealized:
    | {
        readonly display: string | null | undefined
        readonly displayUSD: string | null | undefined
      }
    | null
    | undefined
  readonly saleDate: string | null | undefined
  readonly " $fragmentType": "AuctionResultPrice_auctionResult"
}
export type AuctionResultPrice_auctionResult$key = {
  readonly " $data"?: AuctionResultPrice_auctionResult$data
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultPrice_auctionResult">
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "display",
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "AuctionResultPrice_auctionResult",
    selections: [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "saleDate",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "currency",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "boughtIn",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "isUpcoming",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "AuctionLotPerformance",
        kind: "LinkedField",
        name: "performance",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "mid",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "AuctionLotEstimate",
        kind: "LinkedField",
        name: "estimate",
        plural: false,
        selections: [v0 /*: any*/],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "AuctionResultPriceRealized",
        kind: "LinkedField",
        name: "priceRealized",
        plural: false,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "displayUSD",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "AuctionResult",
    abstractKey: null,
  }
})()

;(node as any).hash = "95f2bb961edaf2669f6ee71720453072"

export default node
