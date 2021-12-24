/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaResults_system = {
    readonly algolia: {
        readonly apiKey: string;
        readonly appID: string;
        readonly indices: ReadonlyArray<{
            readonly displayName: string;
            readonly name: string;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"AlgoliaIndices_algolia" | "AlgoliaResultsList_algolia">;
    } | null;
    readonly " $refType": "AlgoliaResults_system";
};
export type AlgoliaResults_system$data = AlgoliaResults_system;
export type AlgoliaResults_system$key = {
    readonly " $data"?: AlgoliaResults_system$data;
    readonly " $fragmentRefs": FragmentRefs<"AlgoliaResults_system">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlgoliaResults_system",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Algolia",
      "kind": "LinkedField",
      "name": "algolia",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "apiKey",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "appID",
          "storageKey": null
        },
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AlgoliaIndices_algolia"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AlgoliaResultsList_algolia"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "System"
};
(node as any).hash = '9141a695bf21bea53a4c4ba17be9ccdb';
export default node;
