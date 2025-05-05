/**
 * @generated SignedSource<<815871fb76657e384df1db1f327fbbdc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DetailsHeader_order$data = {
  readonly code: string;
  readonly displayTexts: {
    readonly titleText: string;
  };
  readonly " $fragmentType": "DetailsHeader_order";
};
export type DetailsHeader_order$key = {
  readonly " $data"?: DetailsHeader_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"DetailsHeader_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DetailsHeader_order",
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

(node as any).hash = "2aee730e55cb373e6e4bd0af20180c04";

export default node;
