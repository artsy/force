/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ConsignPriceEstimateContext_ArtistInsightByMedium_QueryVariables = {
    artistInternalID: string;
    medium: string;
};
export type ConsignPriceEstimateContext_ArtistInsightByMedium_QueryResponse = {
    readonly marketPriceInsights: {
        readonly artistName: string | null;
        readonly medium: string | null;
        readonly lowRangeCents: unknown | null;
        readonly midRangeCents: unknown | null;
        readonly highRangeCents: unknown | null;
    } | null;
};
export type ConsignPriceEstimateContext_ArtistInsightByMedium_Query = {
    readonly response: ConsignPriceEstimateContext_ArtistInsightByMedium_QueryResponse;
    readonly variables: ConsignPriceEstimateContext_ArtistInsightByMedium_QueryVariables;
};



/*
query ConsignPriceEstimateContext_ArtistInsightByMedium_Query(
  $artistInternalID: ID!
  $medium: String!
) {
  marketPriceInsights(artistId: $artistInternalID, medium: $medium) {
    artistName
    medium
    lowRangeCents
    midRangeCents
    highRangeCents
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
        "variableName": "artistInternalID"
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
        "name": "artistName",
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
        "name": "lowRangeCents",
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
        "name": "highRangeCents",
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
    "name": "ConsignPriceEstimateContext_ArtistInsightByMedium_Query",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConsignPriceEstimateContext_ArtistInsightByMedium_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ConsignPriceEstimateContext_ArtistInsightByMedium_Query",
    "operationKind": "query",
    "text": "query ConsignPriceEstimateContext_ArtistInsightByMedium_Query(\n  $artistInternalID: ID!\n  $medium: String!\n) {\n  marketPriceInsights(artistId: $artistInternalID, medium: $medium) {\n    artistName\n    medium\n    lowRangeCents\n    midRangeCents\n    highRangeCents\n  }\n}\n"
  }
};
})();
(node as any).hash = '024e896596a6c836543fdfb10b81bd72';
export default node;
