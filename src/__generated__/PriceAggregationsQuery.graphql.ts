/**
 * @generated SignedSource<<fbe06979f8c06153c1ab37e4793f1d21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceAggregationsQuery$variables = {
  artistID: string;
};
export type PriceAggregationsQuery$data = {
  readonly artworksConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"Price_artworksConnection">;
  } | null | undefined;
};
export type PriceAggregationsQuery = {
  response: PriceAggregationsQuery$data;
  variables: PriceAggregationsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "SIMPLE_PRICE_HISTOGRAM"
    ]
  },
  {
    "kind": "Variable",
    "name": "artistID",
    "variableName": "artistID"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 0
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceAggregationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Price_artworksConnection"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PriceAggregationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworksAggregationResults",
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
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "count",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2145e19ab94ac1486d9e8c0c04170cc6",
    "id": null,
    "metadata": {},
    "name": "PriceAggregationsQuery",
    "operationKind": "query",
    "text": "query PriceAggregationsQuery(\n  $artistID: String!\n) {\n  artworksConnection(aggregations: [SIMPLE_PRICE_HISTOGRAM], artistID: $artistID, first: 0) {\n    ...Price_artworksConnection\n    id\n  }\n}\n\nfragment Price_artworksConnection on FilterArtworksConnection {\n  aggregations {\n    slice\n    counts {\n      name\n      value\n      count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c2c782473ddf596ca7e52c75d4bdb55e";

export default node;
