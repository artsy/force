/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaIndices_algolia = {
    readonly indices: ReadonlyArray<{
        readonly displayName: string;
        readonly key: string;
        readonly name: string;
    }>;
    readonly " $refType": "AlgoliaIndices_algolia";
};
export type AlgoliaIndices_algolia$data = AlgoliaIndices_algolia;
export type AlgoliaIndices_algolia$key = {
    readonly " $data"?: AlgoliaIndices_algolia$data;
    readonly " $fragmentRefs": FragmentRefs<"AlgoliaIndices_algolia">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlgoliaIndices_algolia",
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
(node as any).hash = '86b12e44c92ee453eba5ac03b860ed5b';
export default node;
