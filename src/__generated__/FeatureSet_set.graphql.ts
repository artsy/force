/**
 * @generated SignedSource<<6063fafe04a889ef5c78f66c364a7ef0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderedSetLayouts = "DEFAULT" | "FULL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FeatureSet_set$data = {
  readonly description: string | null | undefined;
  readonly id: string;
  readonly itemType: string | null | undefined;
  readonly layout: OrderedSetLayouts;
  readonly name: string | null | undefined;
  readonly orderedItems: {
    readonly edges: ReadonlyArray<{
      readonly __typename: "OrderedSetItemEdge";
      readonly node: {
        readonly __typename: string;
        readonly id?: string;
        readonly " $fragmentSpreads": FragmentRefs<"FeatureSetItem_setItem">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentSpreads": FragmentRefs<"FeatureSetContainer_set" | "FeatureSetMeta_set">;
  readonly " $fragmentType": "FeatureSet_set";
};
export type FeatureSet_set$key = {
  readonly " $data"?: FeatureSet_set$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureSet_set">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSet_set",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "layout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemType",
      "storageKey": null
    },
    {
      "alias": "orderedItems",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 99
        }
      ],
      "concreteType": "OrderedSetItemConnection",
      "kind": "LinkedField",
      "name": "orderedItemsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "OrderedSetItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "Artwork",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "FeaturedLink",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "Video",
                  "abstractKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FeatureSetItem_setItem"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderedItemsConnection(first:99)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeatureSetMeta_set"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeatureSetContainer_set"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
})();

(node as any).hash = "4c4f2b108e3bf5fed441ce823e58eded";

export default node;
