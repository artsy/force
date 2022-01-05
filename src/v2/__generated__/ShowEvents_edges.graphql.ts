/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowEvents_edges = ReadonlyArray<{
    readonly node: {
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"ShowCard_show">;
    } | null;
    readonly " $refType": "ShowEvents_edges";
}>;
export type ShowEvents_edges$data = ShowEvents_edges;
export type ShowEvents_edges$key = ReadonlyArray<{
    readonly " $data"?: ShowEvents_edges$data;
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
          "name": "ShowCard_show"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ShowEdge"
};
(node as any).hash = '58326af14db11ca1886a69e4b8fb89dc';
export default node;
