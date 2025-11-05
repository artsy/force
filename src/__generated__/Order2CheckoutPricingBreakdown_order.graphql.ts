/**
 * @generated SignedSource<<952ed0b74fdb0b291c70a7280a0cdf18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutPricingBreakdown_order$data = {
  readonly buyerStateExpiresAt: string | null | undefined;
  readonly mode: OrderModeEnum;
  readonly pricingBreakdownLines: ReadonlyArray<{
    readonly __typename: "ShippingLine";
    readonly amount: {
      readonly amount: string | null | undefined;
      readonly currencySymbol: string | null | undefined;
    } | null | undefined;
    readonly amountFallbackText: string | null | undefined;
    readonly displayName: string;
  } | {
    readonly __typename: "SubtotalLine";
    readonly amount: {
      readonly amount: string | null | undefined;
      readonly currencySymbol: string | null | undefined;
    } | null | undefined;
    readonly displayName: string;
  } | {
    readonly __typename: "TaxLine";
    readonly amount: {
      readonly amount: string | null | undefined;
      readonly currencySymbol: string | null | undefined;
    } | null | undefined;
    readonly amountFallbackText: string | null | undefined;
    readonly displayName: string;
  } | {
    readonly __typename: "TotalLine";
    readonly amount: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly amountFallbackText: string | null | undefined;
    readonly displayName: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined>;
  readonly source: OrderSourceEnum;
  readonly " $fragmentType": "Order2CheckoutPricingBreakdown_order";
};
export type Order2CheckoutPricingBreakdown_order$key = {
  readonly " $data"?: Order2CheckoutPricingBreakdown_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutPricingBreakdown_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencySymbol",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = [
  (v0/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutPricingBreakdown_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "source",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "buyerStateExpiresAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "pricingBreakdownLines",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v3/*: any*/),
          "type": "ShippingLine",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v3/*: any*/),
          "type": "TaxLine",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/)
          ],
          "type": "SubtotalLine",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "amount",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "display",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "TotalLine",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "52a85a3df09af99f600d9b0a5570caaa";

export default node;
