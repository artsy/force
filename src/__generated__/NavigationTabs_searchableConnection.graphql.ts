/**
 * @generated SignedSource<<1aead2465e0d58ad59d9c837272bd6f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SearchAggregation = "TYPE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_searchableConnection$data = {
  readonly aggregations: ReadonlyArray<{
    readonly counts: ReadonlyArray<{
      readonly count: number;
      readonly name: string;
    } | null> | null;
    readonly slice: SearchAggregation | null;
  } | null> | null;
  readonly " $fragmentType": "NavigationTabs_searchableConnection";
};
export type NavigationTabs_searchableConnection$key = {
  readonly " $data"?: NavigationTabs_searchableConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavigationTabs_searchableConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavigationTabs_searchableConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SearchAggregationResults",
      "kind": "LinkedField",
      "name": "aggregations",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slice",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AggregationCount",
          "kind": "LinkedField",
          "name": "counts",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "count",
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
      "storageKey": null
    }
  ],
  "type": "SearchableConnection",
  "abstractKey": null
};

(node as any).hash = "76f1af5fa568892ae22f4ba4840ff358";

export default node;
