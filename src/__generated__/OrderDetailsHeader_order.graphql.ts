/**
 * @generated SignedSource<<7b51af3601bfb5aa9324dcbb0f4abba7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDetailsHeader_order$data = {
  readonly code: string;
  readonly displayTexts: {
    readonly title: string;
  };
  readonly " $fragmentType": "OrderDetailsHeader_order";
};
export type OrderDetailsHeader_order$key = {
  readonly " $data"?: OrderDetailsHeader_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsHeader_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderDetailsHeader_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
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
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "8b6ae134c5662a148e2d8d0d9b5928d7";

export default node;
