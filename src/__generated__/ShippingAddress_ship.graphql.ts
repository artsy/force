/**
 * @generated SignedSource<<4cc417bedbc94defff9c64e17ef9fd29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ShippingAddress_ship$data = {
  readonly addressLine1?: string | null | undefined
  readonly addressLine2?: string | null | undefined
  readonly city?: string | null | undefined
  readonly country?: string | null | undefined
  readonly name?: string | null | undefined
  readonly phoneNumber?: string | null | undefined
  readonly postalCode?: string | null | undefined
  readonly region?: string | null | undefined
  readonly " $fragmentType": "ShippingAddress_ship"
}
export type ShippingAddress_ship$key = {
  readonly " $data"?: ShippingAddress_ship$data
  readonly " $fragmentSpreads": FragmentRefs<"ShippingAddress_ship">
}

const node: ReaderFragment = (function () {
  var v0 = [
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
      name: "addressLine1",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "addressLine2",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "city",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "postalCode",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "region",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "country",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "phoneNumber",
      storageKey: null,
    },
  ]
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "ShippingAddress_ship",
    selections: [
      {
        kind: "InlineFragment",
        selections: v0 /*: any*/,
        type: "CommerceShip",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v0 /*: any*/,
        type: "CommerceShipArta",
        abstractKey: null,
      },
    ],
    type: "CommerceRequestedFulfillmentUnion",
    abstractKey: "__isCommerceRequestedFulfillmentUnion",
  }
})()

;(node as any).hash = "92a7556e23bed9386cd5a051956ad8db"

export default node
