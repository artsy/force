/**
 * @generated SignedSource<<7ac96f88b14862c5cf64c76644a35050>>
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
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutPricingBreakdown_order">;
  readonly " $fragmentType": "Order2RespondOfferDetails_order";
};
export type Order2RespondOfferDetails_order$key = {
  readonly " $data"?: Order2RespondOfferDetails_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondOfferDetails_order">;
};

const node: ReaderFragment = {
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
      "selections": [
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
      ],
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

(node as any).hash = "cc1a9ca55623dcafa36ce4ed3cd94dad";

export default node;
