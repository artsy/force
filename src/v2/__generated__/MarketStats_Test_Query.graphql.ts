/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MarketStats_Test_QueryVariables = {
    artistInternalID: string;
};
export type MarketStats_Test_QueryResponse = {
    readonly priceInsightsConnection: {
        readonly " $fragmentRefs": FragmentRefs<"MarketStats_priceInsightsConnection">;
    } | null;
};
export type MarketStats_Test_Query = {
    readonly response: MarketStats_Test_QueryResponse;
    readonly variables: MarketStats_Test_QueryVariables;
};



/*
query MarketStats_Test_Query(
  $artistInternalID: ID!
) {
  priceInsightsConnection: priceInsights(artistId: $artistInternalID, sort: ANNUAL_VALUE_SOLD_CENTS_DESC) {
    ...MarketStats_priceInsightsConnection
  }
}

fragment MarketStats_priceInsightsConnection on PriceInsightConnection {
  edges {
    node {
      medium
      annualLotsSold
      annualValueSoldCents
      sellThroughRate
      medianSaleOverEstimatePercentage
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistInternalID",
    "type": "ID!"
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
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "priceInsightsConnection": {
          "type": "PriceInsightConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "priceInsightsConnection.edges": {
          "type": "PriceInsightEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "priceInsightsConnection.edges.node": {
          "type": "MarketPriceInsights",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "priceInsightsConnection.edges.node.medium": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "priceInsightsConnection.edges.node.annualLotsSold": (v2/*: any*/),
        "priceInsightsConnection.edges.node.annualValueSoldCents": {
          "type": "BigInt",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "priceInsightsConnection.edges.node.sellThroughRate": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "priceInsightsConnection.edges.node.medianSaleOverEstimatePercentage": (v2/*: any*/),
        "priceInsightsConnection.edges.node.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "MarketStats_Test_Query",
    "operationKind": "query",
    "text": "query MarketStats_Test_Query(\n  $artistInternalID: ID!\n) {\n  priceInsightsConnection: priceInsights(artistId: $artistInternalID, sort: ANNUAL_VALUE_SOLD_CENTS_DESC) {\n    ...MarketStats_priceInsightsConnection\n  }\n}\n\nfragment MarketStats_priceInsightsConnection on PriceInsightConnection {\n  edges {\n    node {\n      medium\n      annualLotsSold\n      annualValueSoldCents\n      sellThroughRate\n      medianSaleOverEstimatePercentage\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6af6dc9e71ce14051ef8e4af5624d77b';
export default node;
