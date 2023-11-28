/**
 * @generated SignedSource<<394051c1bae78fd51069f940b0163206>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MarketStats_Test_Query$variables = {
  artistInternalID: string;
};
export type MarketStats_Test_Query$data = {
  readonly priceInsightsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"MarketStats_priceInsightsConnection">;
  } | null | undefined;
};
export type MarketStats_Test_Query = {
  response: MarketStats_Test_Query$data;
  variables: MarketStats_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistInternalID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "artistId",
    "variableName": "artistInternalID"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "ANNUAL_VALUE_SOLD_CENTS_DESC"
  }
],
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MarketStats_Test_Query",
    "selections": [
      {
        "alias": "priceInsightsConnection",
        "args": (v1/*: any*/),
        "concreteType": "PriceInsightConnection",
        "kind": "LinkedField",
        "name": "priceInsights",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MarketStats_priceInsightsConnection"
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
    "name": "MarketStats_Test_Query",
    "selections": [
      {
        "alias": "priceInsightsConnection",
        "args": (v1/*: any*/),
        "concreteType": "PriceInsightConnection",
        "kind": "LinkedField",
        "name": "priceInsights",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PriceInsightEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MarketPriceInsights",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "medium",
                    "storageKey": null
                  },
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
                    "name": "annualValueSoldCents",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sellThroughRate",
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
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8c98db6a8df16f080ab0cdacba936001",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "priceInsightsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PriceInsightConnection"
        },
        "priceInsightsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PriceInsightEdge"
        },
        "priceInsightsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MarketPriceInsights"
        },
        "priceInsightsConnection.edges.node.annualLotsSold": (v2/*: any*/),
        "priceInsightsConnection.edges.node.annualValueSoldCents": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BigInt"
        },
        "priceInsightsConnection.edges.node.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "priceInsightsConnection.edges.node.medianSaleOverEstimatePercentage": (v2/*: any*/),
        "priceInsightsConnection.edges.node.medium": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "priceInsightsConnection.edges.node.sellThroughRate": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        }
      }
    },
    "name": "MarketStats_Test_Query",
    "operationKind": "query",
    "text": "query MarketStats_Test_Query(\n  $artistInternalID: ID!\n) {\n  priceInsightsConnection: priceInsights(artistId: $artistInternalID, sort: ANNUAL_VALUE_SOLD_CENTS_DESC) {\n    ...MarketStats_priceInsightsConnection\n  }\n}\n\nfragment MarketStats_priceInsightsConnection on PriceInsightConnection {\n  edges {\n    node {\n      medium\n      annualLotsSold\n      annualValueSoldCents\n      sellThroughRate\n      medianSaleOverEstimatePercentage\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6af6dc9e71ce14051ef8e4af5624d77b";

export default node;
