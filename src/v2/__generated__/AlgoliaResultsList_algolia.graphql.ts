/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaResultsList_algolia = {
    readonly indices: ReadonlyArray<{
        readonly displayName: string;
        readonly name: string;
    }>;
    readonly " $refType": "AlgoliaResultsList_algolia";
};
export type AlgoliaResultsList_algolia$data = AlgoliaResultsList_algolia;
export type AlgoliaResultsList_algolia$key = {
    readonly " $data"?: AlgoliaResultsList_algolia$data;
    readonly " $fragmentRefs": FragmentRefs<"AlgoliaResultsList_algolia">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlgoliaResultsList_algolia",
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Algolia"
};
(node as any).hash = '7aaa17ee904ab0eb6f044b27abf01113';
export default node;
