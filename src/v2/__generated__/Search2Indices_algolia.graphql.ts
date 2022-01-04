/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Search2Indices_algolia = {
    readonly indices: ReadonlyArray<{
        readonly displayName: string;
        readonly key: string;
        readonly name: string;
    }>;
    readonly " $refType": "Search2Indices_algolia";
};
export type Search2Indices_algolia$data = Search2Indices_algolia;
export type Search2Indices_algolia$key = {
    readonly " $data"?: Search2Indices_algolia$data;
    readonly " $fragmentRefs": FragmentRefs<"Search2Indices_algolia">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Search2Indices_algolia",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AlgoliaIndex",
      "kind": "LinkedField",
      "name": "indices",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "key",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Algolia"
};
(node as any).hash = 'ae32ce9c5cd5d9e96fa6e11fa51ee52b';
export default node;
