/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaResults_algolia = {
    readonly indices: ReadonlyArray<{
        readonly displayName: string;
        readonly name: string;
    }>;
    readonly " $refType": "AlgoliaResults_algolia";
};
export type AlgoliaResults_algolia$data = AlgoliaResults_algolia;
export type AlgoliaResults_algolia$key = {
    readonly " $data"?: AlgoliaResults_algolia$data;
    readonly " $fragmentRefs": FragmentRefs<"AlgoliaResults_algolia">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlgoliaResults_algolia",
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
(node as any).hash = 'eddc04cfc7a9f7c0494ad7538739b317';
export default node;
