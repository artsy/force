/**
 * @generated SignedSource<<f1fbdaa03df42e0755285ed62f75a21a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type AuctionBuyersPremiumDialog_sale$data = {
  readonly buyersPremium:
    | ReadonlyArray<
        | {
            readonly amount: string | null | undefined
            readonly cents: number | null | undefined
            readonly percent: number | null | undefined
          }
        | null
        | undefined
      >
    | null
    | undefined
  readonly " $fragmentType": "AuctionBuyersPremiumDialog_sale"
}
export type AuctionBuyersPremiumDialog_sale$key = {
  readonly " $data"?: AuctionBuyersPremiumDialog_sale$data
  readonly " $fragmentSpreads": FragmentRefs<"AuctionBuyersPremiumDialog_sale">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "AuctionBuyersPremiumDialog_sale",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: "BuyersPremium",
      kind: "LinkedField",
      name: "buyersPremium",
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "amount",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "cents",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "percent",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "Sale",
  abstractKey: null,
}

;(node as any).hash = "d5dc940e4dae5c1cc9bf83a6fd8add0e"

export default node
