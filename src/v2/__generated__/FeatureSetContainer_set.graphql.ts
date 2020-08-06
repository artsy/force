/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureSetContainer_set = {
    readonly id: string;
    readonly itemType: string | null;
    readonly orderedItems: {
        readonly edges: ReadonlyArray<{
            readonly __typename: string;
        } | null> | null;
    };
    readonly " $refType": "FeatureSetContainer_set";
};
export type FeatureSetContainer_set$data = FeatureSetContainer_set;
export type FeatureSetContainer_set$key = {
    readonly " $data"?: FeatureSetContainer_set$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureSetContainer_set">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureSetContainer_set",
  "type": "OrderedSet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemType",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "orderedItems",
      "name": "orderedItemsConnection",
      "storageKey": "orderedItemsConnection(first:35)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 35
        }
      ],
      "concreteType": "OrderedSetItemConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "OrderedSetItemEdge",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "__typename",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '1426721195af893bf2e41b4cdda194df';
export default node;
