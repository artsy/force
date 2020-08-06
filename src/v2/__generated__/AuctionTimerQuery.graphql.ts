/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionTimerQueryVariables = {
    saleID: string;
};
export type AuctionTimerQueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionTimer_sale">;
    } | null;
};
export type AuctionTimerQuery = {
    readonly response: AuctionTimerQueryResponse;
    readonly variables: AuctionTimerQueryVariables;
};



/*
query AuctionTimerQuery(
  $saleID: String!
) {
  sale(id: $saleID) {
    ...AuctionTimer_sale
    id
  }
}

fragment AuctionTimer_sale on Sale {
  live_start_at: liveStartAt
  end_at: endAt
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleID"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AuctionTimerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AuctionTimer_sale",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AuctionTimerQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": "live_start_at",
            "name": "liveStartAt",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "end_at",
            "name": "endAt",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AuctionTimerQuery",
    "id": null,
    "text": "query AuctionTimerQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) {\n    ...AuctionTimer_sale\n    id\n  }\n}\n\nfragment AuctionTimer_sale on Sale {\n  live_start_at: liveStartAt\n  end_at: endAt\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '67de4ea3de2f4ebe608f8bd2df2d6b88';
export default node;
