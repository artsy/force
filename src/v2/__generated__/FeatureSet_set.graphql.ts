/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureSet_set = {
    readonly id: string;
    readonly name: string | null;
    readonly description: string | null;
    readonly itemType: string | null;
    readonly orderedItems: {
        readonly edges: ReadonlyArray<{
            readonly __typename: string;
            readonly node: {
                readonly id?: string;
                readonly " $fragmentRefs": FragmentRefs<"FeatureSetItem_setItem">;
            } | null;
        } | null> | null;
    };
    readonly " $fragmentRefs": FragmentRefs<"FeatureSetMeta_set" | "FeatureSetContainer_set">;
    readonly " $refType": "FeatureSet_set";
};
export type FeatureSet_set$data = FeatureSet_set;
export type FeatureSet_set$key = {
    readonly " $data"?: FeatureSet_set$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureSet_set">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "kind": "Fragment",
  "name": "FeatureSet_set",
  "type": "OrderedSet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "storageKey": "description(format:\"HTML\")"
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
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "type": "Artwork",
                  "selections": (v1/*: any*/)
                },
                {
                  "kind": "InlineFragment",
                  "type": "FeaturedLink",
                  "selections": (v1/*: any*/)
                },
                {
                  "kind": "FragmentSpread",
                  "name": "FeatureSetItem_setItem",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "FeatureSetMeta_set",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FeatureSetContainer_set",
      "args": null
    }
  ]
};
})();
(node as any).hash = '9b7a193447e8ab6dbc35747878b5d3fd';
export default node;
