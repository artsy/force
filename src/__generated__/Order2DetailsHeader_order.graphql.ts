/**
 * @generated SignedSource<<d425c4481da5ae52ce148675aabf2a91>>
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
    readonly title: string;
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

(node as any).hash = "5fd40254975455c949309bf42c5ada19";

export default node;
