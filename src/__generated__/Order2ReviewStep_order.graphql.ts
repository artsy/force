/**
 * @generated SignedSource<<b90590638314e6b2c591add1381e1496>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderPaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2ReviewStep_order$data = {
  readonly buyerStateExpiresAt: string | null | undefined;
  readonly buyerTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly itemsTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly lineItems: ReadonlyArray<{
    readonly listPrice: {
      readonly __typename: "Money";
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"useOrder2LineItemData_lineItem">;
  } | null | undefined>;
  readonly paymentMethod: OrderPaymentMethodEnum | null | undefined;
  readonly pendingOffer: {
    readonly internalID: string;
  } | null | undefined;
  readonly shippingTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly source: OrderSourceEnum;
  readonly stripeConfirmationToken: string | null | undefined;
  readonly taxTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OrderSummary_order">;
  readonly " $fragmentType": "Order2ReviewStep_order";
};
export type Order2ReviewStep_order$key = {
  readonly " $data"?: Order2ReviewStep_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2ReviewStep_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2ReviewStep_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2OrderSummary_order"
    },
    (v0/*: any*/),
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
      "name": "buyerStateExpiresAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stripeConfirmationToken",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentMethod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "buyerTotal",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "itemsTotal",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "shippingTotal",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "taxTotal",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LineItem",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "listPrice",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            (v1/*: any*/)
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useOrder2LineItemData_lineItem"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "pendingOffer",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "a24a619584d8e89c86b5ce789391d571";

export default node;
