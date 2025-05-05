/**
 * @generated SignedSource<<68ea1902f9d517af2184de87eff8f4c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsHeader_order$data = {
  readonly code: string;
  readonly displayTexts: {
    readonly titleText: string;
  };
  readonly " $fragmentType": "Order2DetailsHeader_order";
};
export type Order2DetailsHeader_order$key = {
  readonly " $data"?: Order2DetailsHeader_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsHeader_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DetailsHeader_order",
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
          "name": "titleText",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "cd083827d41bc82288815e03e8096e50";

export default node;
