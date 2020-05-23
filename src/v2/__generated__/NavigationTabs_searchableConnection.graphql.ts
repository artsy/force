/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type SearchAggregation = "TYPE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_searchableConnection = {
    readonly aggregations: ReadonlyArray<{
        readonly slice: SearchAggregation | null;
        readonly counts: ReadonlyArray<{
            readonly count: number;
            readonly name: string;
        } | null> | null;
    } | null> | null;
    readonly " $refType": "NavigationTabs_searchableConnection";
};
export type NavigationTabs_searchableConnection$data = NavigationTabs_searchableConnection;
export type NavigationTabs_searchableConnection$key = {
    readonly " $data"?: NavigationTabs_searchableConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_searchableConnection">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "NavigationTabs_searchableConnection",
  "type": "SearchableConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "aggregations",
      "storageKey": null,
      "args": null,
      "concreteType": "SearchAggregationResults",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slice",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "counts",
          "storageKey": null,
          "args": null,
          "concreteType": "AggregationCount",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "count",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '76f1af5fa568892ae22f4ba4840ff358';
export default node;
