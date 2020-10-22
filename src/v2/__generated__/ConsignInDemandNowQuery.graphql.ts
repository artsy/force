/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ConsignInDemandNowQueryVariables = {
    artistInternalId: string;
    medium: string;
};
export type ConsignInDemandNowQueryResponse = {
    readonly marketPriceInsights: {
        readonly annualLotsSold: number | null;
        readonly annualValueSoldCents: unknown | null;
        readonly artistId: string | null;
        readonly artistName: string | null;
        readonly artsyQInventory: number | null;
        readonly createdAt: unknown | null;
        readonly demandRank: number | null;
        readonly demandTrend: number | null;
        readonly highRangeCents: unknown | null;
        readonly largeHighRangeCents: unknown | null;
        readonly largeLowRangeCents: unknown | null;
        readonly largeMidRangeCents: unknown | null;
        readonly liquidityRank: number | null;
        readonly lowRangeCents: unknown | null;
        readonly medianSaleToEstimateRatio: number | null;
        readonly medium: string | null;
        readonly mediumHighRangeCents: unknown | null;
        readonly mediumLowRangeCents: unknown | null;
        readonly mediumMidRangeCents: unknown | null;
        readonly midRangeCents: unknown | null;
        readonly sellThroughRate: number | null;
        readonly smallHighRangeCents: unknown | null;
        readonly smallLowRangeCents: unknown | null;
        readonly smallMidRangeCents: unknown | null;
        readonly updatedAt: unknown | null;
    } | null;
};
export type ConsignInDemandNowQuery = {
    readonly response: ConsignInDemandNowQueryResponse;
    readonly variables: ConsignInDemandNowQueryVariables;
};



/*
query ConsignInDemandNowQuery(
  $artistInternalId: ID!
  $medium: String!
) {
  marketPriceInsights(artistId: $artistInternalId, medium: $medium) {
    annualLotsSold
    annualValueSoldCents
    artistId
    artistName
    artsyQInventory
    createdAt
    demandRank
    demandTrend
    highRangeCents
    largeHighRangeCents
    largeLowRangeCents
    largeMidRangeCents
    liquidityRank
    lowRangeCents
    medianSaleToEstimateRatio
    medium
    mediumHighRangeCents
    mediumLowRangeCents
    mediumMidRangeCents
    midRangeCents
    sellThroughRate
    smallHighRangeCents
    smallLowRangeCents
    smallMidRangeCents
    updatedAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistInternalId",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "medium",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "artistId",
        "variableName": "artistInternalId"
      },
      {
        "kind": "Variable",
        "name": "medium",
        "variableName": "medium"
      }
    ],
    "concreteType": "MarketPriceInsights",
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
        "name": "annualValueSoldCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "artistId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "artistName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "artsyQInventory",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "demandRank",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "demandTrend",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "highRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "largeHighRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "largeLowRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "largeMidRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "liquidityRank",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lowRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "medianSaleToEstimateRatio",
        "storageKey": null
      },
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
        "name": "mediumHighRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mediumLowRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mediumMidRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "midRangeCents",
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
        "name": "smallHighRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "smallLowRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "smallMidRangeCents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConsignInDemandNowQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConsignInDemandNowQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ConsignInDemandNowQuery",
    "operationKind": "query",
    "text": "query ConsignInDemandNowQuery(\n  $artistInternalId: ID!\n  $medium: String!\n) {\n  marketPriceInsights(artistId: $artistInternalId, medium: $medium) {\n    annualLotsSold\n    annualValueSoldCents\n    artistId\n    artistName\n    artsyQInventory\n    createdAt\n    demandRank\n    demandTrend\n    highRangeCents\n    largeHighRangeCents\n    largeLowRangeCents\n    largeMidRangeCents\n    liquidityRank\n    lowRangeCents\n    medianSaleToEstimateRatio\n    medium\n    mediumHighRangeCents\n    mediumLowRangeCents\n    mediumMidRangeCents\n    midRangeCents\n    sellThroughRate\n    smallHighRangeCents\n    smallLowRangeCents\n    smallMidRangeCents\n    updatedAt\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a7cf18943f14ee6fedccfdcd65ac9549';
export default node;
