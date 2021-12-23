/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaApp_system = {
    readonly algolia: {
        readonly apiKey: string;
        readonly appID: string;
        readonly indices: ReadonlyArray<{
            readonly displayName: string;
            readonly name: string;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"AlgoliaIndices_algolia" | "AlgoliaResults_algolia">;
    } | null;
    readonly " $refType": "AlgoliaApp_system";
};
export type AlgoliaApp_system$data = AlgoliaApp_system;
export type AlgoliaApp_system$key = {
    readonly " $data"?: AlgoliaApp_system$data;
    readonly " $fragmentRefs": FragmentRefs<"AlgoliaApp_system">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlgoliaApp_system",
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
          "name": "AlgoliaResults_algolia"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "System"
};
(node as any).hash = '918a8b800cf6625a0c053a0c918535d1';
export default node;
