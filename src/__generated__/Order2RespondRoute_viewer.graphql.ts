/**
 * @generated SignedSource<<520e7888278373568c3ab32fd6d1f455>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondRoute_viewer$data = {
  readonly me: {
    readonly order: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"Order2RespondApp_order" | "Order2RespondContext_order">;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order2RespondRoute_viewer";
};
export type Order2RespondRoute_viewer$key = {
  readonly " $data"?: Order2RespondRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondRoute_viewer">;
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
  "name": "Order2RespondRoute_viewer",
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
              "name": "Order2RespondContext_order"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Order2RespondApp_order"
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

(node as any).hash = "b1aa346bb93dfbd773ab70f2e58075b2";

export default node;
