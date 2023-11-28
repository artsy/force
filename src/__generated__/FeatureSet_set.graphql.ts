/**
 * @generated SignedSource<<171c0916fd51ceac9823db476f108b74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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
v1 = [
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": (v1/*: any*/),
                  "type": "Artwork",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v1/*: any*/),
                  "type": "FeaturedLink",
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

(node as any).hash = "6477bebfd7bcb4bb613c4f780af6c886";

export default node;
