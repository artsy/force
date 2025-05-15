/**
 * @generated SignedSource<<22a9c059468c774ce3eaa25af5958743>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsMessage_order$data = {
  readonly displayTexts: {
    readonly message: string | null | undefined;
  };
  readonly " $fragmentType": "Order2DetailsMessage_order";
};
export type Order2DetailsMessage_order$key = {
  readonly " $data"?: Order2DetailsMessage_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsMessage_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DetailsMessage_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "DisplayTexts",
      "kind": "LinkedField",
      "name": "displayTexts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "23cc3c4ca3141ad617629b0acc31e381";

export default node;
