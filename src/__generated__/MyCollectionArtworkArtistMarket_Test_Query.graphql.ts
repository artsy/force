/**
 * @generated SignedSource<<dd990cc928b86c8bf0d25dbdcde513ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkArtistMarket_Test_Query$variables = Record<PropertyKey, never>;
export type MyCollectionArtworkArtistMarket_Test_Query$data = {
  readonly artwork: {
    readonly marketPriceInsights: {
      readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkArtistMarket_marketPriceInsights">;
    } | null | undefined;
  } | null | undefined;
};
export type MyCollectionArtworkArtistMarket_Test_Query = {
  response: MyCollectionArtworkArtistMarket_Test_Query$data;
  variables: MyCollectionArtworkArtistMarket_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionArtworkArtistMarket_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkPriceInsights",
            "kind": "LinkedField",
            "name": "marketPriceInsights",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MyCollectionArtworkArtistMarket_marketPriceInsights"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkArtistMarket_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkPriceInsights",
            "kind": "LinkedField",
            "name": "marketPriceInsights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "annualLotsSold",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "annualValueSoldDisplayText",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "medianSaleOverEstimatePercentage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liquidityRankDisplayText",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sellThroughRate",
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
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "5b0233d743da651b03e469c7dd09b29d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.annualLotsSold": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "artwork.marketPriceInsights.annualValueSoldDisplayText": (v1/*: any*/),
        "artwork.marketPriceInsights.liquidityRankDisplayText": (v1/*: any*/),
        "artwork.marketPriceInsights.medianSaleOverEstimatePercentage": (v2/*: any*/),
        "artwork.marketPriceInsights.sellThroughRate": (v2/*: any*/)
      }
    },
    "name": "MyCollectionArtworkArtistMarket_Test_Query",
    "operationKind": "query",
    "text": "query MyCollectionArtworkArtistMarket_Test_Query {\n  artwork(id: \"foo\") {\n    marketPriceInsights {\n      ...MyCollectionArtworkArtistMarket_marketPriceInsights\n    }\n    id\n  }\n}\n\nfragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {\n  annualLotsSold\n  annualValueSoldDisplayText\n  medianSaleOverEstimatePercentage\n  liquidityRankDisplayText\n  sellThroughRate\n}\n"
  }
};
})();

(node as any).hash = "d80d43a3006dcfe6a3a879d3556af8e6";

export default node;
