/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Search2ResultsList_algolia = {
    readonly indices: ReadonlyArray<{
        readonly displayName: string;
        readonly name: string;
    }>;
    readonly " $refType": "Search2ResultsList_algolia";
};
export type Search2ResultsList_algolia$data = Search2ResultsList_algolia;
export type Search2ResultsList_algolia$key = {
    readonly " $data"?: Search2ResultsList_algolia$data;
    readonly " $fragmentRefs": FragmentRefs<"Search2ResultsList_algolia">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Search2ResultsList_algolia",
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
(node as any).hash = '75153ad3a409e500caf7eb0064103b0f';
export default node;
