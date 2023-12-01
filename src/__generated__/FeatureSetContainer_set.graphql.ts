/**
 * @generated SignedSource<<d84c7595f3fd52a80d33620c3e8ee1ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type OrderedSetLayouts = "DEFAULT" | "FULL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FeatureSetContainer_set$data = {
  readonly id: string;
  readonly itemType: string | null | undefined;
  readonly layout: OrderedSetLayouts;
  readonly orderedItems: {
    readonly edges: ReadonlyArray<{
      readonly __typename: "OrderedSetItemEdge";
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "FeatureSetContainer_set";
};
export type FeatureSetContainer_set$key = {
  readonly " $data"?: FeatureSetContainer_set$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureSetContainer_set">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSetContainer_set",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderedItemsConnection(first:99)"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};

(node as any).hash = "cd201cbc56739148de87d174e2559f3e";

export default node;
