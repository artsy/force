/**
 * @generated SignedSource<<5fb482b7ece18cb38b240f861cd92721>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutRoute_viewer$data = {
  readonly me: {
    readonly order: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_order" | "Order2CheckoutContext_order">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_me" | "Order2CheckoutContext_me">;
  } | null | undefined;
  readonly " $fragmentType": "Order2CheckoutRoute_viewer";
};
export type Order2CheckoutRoute_viewer$key = {
  readonly " $data"?: Order2CheckoutRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutRoute_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "orderID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutRoute_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Me",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Order2CheckoutApp_me"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Order2CheckoutContext_me"
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "id",
              "variableName": "orderID"
            }
          ],
          "concreteType": "Order",
          "kind": "LinkedField",
          "name": "order",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Order2CheckoutContext_order"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Order2CheckoutApp_order"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "547621e854a4748fe6672f448c2cb4c6";

export default node;
