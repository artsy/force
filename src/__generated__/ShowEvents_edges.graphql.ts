/**
 * @generated SignedSource<<22c18d1546fb7a46740abd2b3af32297>>
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
    readonly " $fragmentSpreads": FragmentRefs<"CellShow_show">;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "CellShow_show"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ShowEdge",
  "abstractKey": null
};

(node as any).hash = "3d9ebca4ccbc4133b6c1950fe311d8ca";

export default node;
