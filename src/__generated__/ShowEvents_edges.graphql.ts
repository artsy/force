/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowEvents_edges = ReadonlyArray<{
    readonly node: {
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"CellShow_show">;
    } | null;
    readonly " $refType": "ShowEvents_edges";
}>;
export type ShowEvents_edges$data = ShowEvents_edges;
export type ShowEvents_edges$key = ReadonlyArray<{
    readonly " $data"?: ShowEvents_edges$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ShowEvents_edges">;
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
          "name": "CellShow_show"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ShowEdge",
  "abstractKey": null
};
(node as any).hash = '3d9ebca4ccbc4133b6c1950fe311d8ca';
export default node;
