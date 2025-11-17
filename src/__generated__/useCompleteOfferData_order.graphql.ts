/**
 * @generated SignedSource<<f0481ba157d4fa12970bd67e3c2d21b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useCompleteOfferData_order$data = {
  readonly mode: OrderModeEnum;
  readonly offers: ReadonlyArray<{
    readonly amount: {
      readonly display: string | null | undefined;
      readonly minor: any;
    } | null | undefined;
    readonly createdAt: string | null | undefined;
    readonly note: string | null | undefined;
  }>;
  readonly " $fragmentType": "useCompleteOfferData_order";
};
export type useCompleteOfferData_order$key = {
  readonly " $data"?: useCompleteOfferData_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCompleteOfferData_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCompleteOfferData_order",
  "selections": [
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
              "name": "minor",
              "storageKey": null
            },
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

(node as any).hash = "945d12299d897e0875a3b92d7b6526ed";

export default node;
