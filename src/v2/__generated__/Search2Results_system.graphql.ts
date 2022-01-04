/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Search2Results_system = {
    readonly algolia: {
        readonly apiKey: string;
        readonly appID: string;
        readonly indices: ReadonlyArray<{
            readonly displayName: string;
            readonly name: string;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"Search2Indices_algolia" | "Search2ResultsList_algolia">;
    } | null;
    readonly " $refType": "Search2Results_system";
};
export type Search2Results_system$data = Search2Results_system;
export type Search2Results_system$key = {
    readonly " $data"?: Search2Results_system$data;
    readonly " $fragmentRefs": FragmentRefs<"Search2Results_system">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Search2Results_system",
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
          "name": "Search2Indices_algolia"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Search2ResultsList_algolia"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "System"
};
(node as any).hash = '81bd2f9ba691b6f07a5af2f2668e0abb';
export default node;
