/**
 * @generated SignedSource<<b828b8e79ce8432f72ceeb0a4f45aa89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowEvents_edges$data = ReadonlyArray<{
  readonly node: {
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"ShowCard_show">;
  } | null;
  readonly " $fragmentType": "ShowEvents_edges";
}>;
export type ShowEvents_edges$key = ReadonlyArray<{
  readonly " $data"?: ShowEvents_edges$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowEvents_edges">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ShowEvents_edges",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Show",
      "kind": "LinkedField",
      "name": "node",
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
          "name": "ShowCard_show"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ShowEdge",
  "abstractKey": null
};

(node as any).hash = "58326af14db11ca1886a69e4b8fb89dc";

export default node;
