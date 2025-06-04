/**
 * @generated SignedSource<<0c180ff706ea644b61a5cbc51a03a4d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2PaymentForm_order$data = {
  readonly internalID: string;
  readonly itemsTotal: {
    readonly currencyCode: string;
    readonly minor: any;
  } | null | undefined;
  readonly seller: {
    readonly merchantAccount?: {
      readonly externalId: string;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order2PaymentForm_order";
};
export type Order2PaymentForm_order$key = {
  readonly " $data"?: Order2PaymentForm_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentForm_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2PaymentForm_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "itemsTotal",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currencyCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "seller",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerMerchantAccount",
              "kind": "LinkedField",
              "name": "merchantAccount",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "externalId",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "Partner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "c219452c7f04e265b343a83772257827";

export default node;
