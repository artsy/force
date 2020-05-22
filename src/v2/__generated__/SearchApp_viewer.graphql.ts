/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type SearchAggregation = "TYPE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SearchApp_viewer = {
    readonly searchConnection: {
        readonly aggregations: ReadonlyArray<{
            readonly slice: SearchAggregation | null;
            readonly counts: ReadonlyArray<{
                readonly count: number;
                readonly name: string;
            } | null> | null;
        } | null> | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug?: string;
                readonly displayLabel?: string | null;
                readonly displayType?: string | null;
            } | null;
        } | null> | null;
        readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_searchableConnection">;
    } | null;
    readonly artworksConnection: {
        readonly counts: {
            readonly total: number | null;
        } | null;
    } | null;
    readonly " $refType": "SearchApp_viewer";
};
export type SearchApp_viewer$data = SearchApp_viewer;
export type SearchApp_viewer$key = {
    readonly " $data"?: SearchApp_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"SearchApp_viewer">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SearchApp_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "term",
      "type": "String!",
      "defaultValue": ""
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "searchConnection",
      "storageKey": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TYPE"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "term"
        }
      ],
      "concreteType": "SearchableConnection",
      "plural": false,
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
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "SearchableEdge",
          "plural": true,
          "selections": [
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
                  "type": "SearchableItem",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "slug",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "displayLabel",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "displayType",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "NavigationTabs_searchableConnection",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworksConnection",
      "storageKey": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ]
        },
        {
          "kind": "Variable",
          "name": "keyword",
          "variableName": "term"
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 0
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "counts",
          "storageKey": null,
          "args": null,
          "concreteType": "FilterArtworksCounts",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "total",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '35e201abf8d672d14777050f0cca8a84';
export default node;
