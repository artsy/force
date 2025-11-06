/**
 * @generated SignedSource<<5a41358f717f0c78d1798645e0e088f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2OfferCompletedView_order$data = {
  readonly currencyCode: string;
  readonly offers: ReadonlyArray<{
    readonly amount: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly createdAt: string | null | undefined;
    readonly note: string | null | undefined;
  }> | null | undefined;
  readonly " $fragmentType": "Order2OfferCompletedView_order";
};
export type Order2OfferCompletedView_order$key = {
  readonly " $data"?: Order2OfferCompletedView_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OfferCompletedView_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2OfferCompletedView_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "offers",
      "plural": true,
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
          "kind": "ScalarField",
          "name": "note",
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
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "7d445dddeb6f232816c4bff05d509af9";

export default node;
