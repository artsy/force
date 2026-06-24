/**
 * @generated SignedSource<<4e8ac3e6eecd2b555e1270f1ecfacb8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondOfferDetails_order$data = {
  readonly buyerStateExpiresAt: string | null | undefined;
  readonly lastSubmittedOffer: {
    readonly amount: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly createdAt: string | null | undefined;
  } | null | undefined;
  readonly pendingOffer: {
    readonly amount: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly createdAt: string | null | undefined;
  } | null | undefined;
  readonly submittedOffers: ReadonlyArray<{
    readonly amount: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly createdAt: string | null | undefined;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutPricingBreakdown_order">;
  readonly " $fragmentType": "Order2RespondOfferDetails_order";
};
export type Order2RespondOfferDetails_order$key = {
  readonly " $data"?: Order2RespondOfferDetails_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondOfferDetails_order">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "createdAt",
    "storageKey": null
  },
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondOfferDetails_order",
  "selections": [
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
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "lastSubmittedOffer",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "submittedOffers",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "pendingOffer",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2CheckoutPricingBreakdown_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "c7dbc45bc6fbbc2bf4fdda46ac5db047";

export default node;
