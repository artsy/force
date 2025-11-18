/**
 * @generated SignedSource<<8d50254f3a2db210346d058fbf79fc97>>
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
  readonly pendingOffer: {
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
  } | null | undefined;
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
],
v4 = {
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
};
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
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "pendingOffer",
      "plural": false,
      "selections": [
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "e5a999380639b2f226d9dfcbcd03672d";

export default node;
