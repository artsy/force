/* tslint:disable */
/* eslint-disable */

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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!"
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
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionTimerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionTimer_sale"
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
    "name": "AuctionTimerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "alias": "live_start_at",
            "args": null,
            "kind": "ScalarField",
            "name": "liveStartAt",
            "storageKey": null
          },
          {
            "alias": "end_at",
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
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
    "id": null,
    "metadata": {},
    "name": "AuctionTimerQuery",
    "operationKind": "query",
    "text": "query AuctionTimerQuery(\n  $saleID: String!\n) {\n  sale(id: $saleID) {\n    ...AuctionTimer_sale\n    id\n  }\n}\n\nfragment AuctionTimer_sale on Sale {\n  live_start_at: liveStartAt\n  end_at: endAt\n}\n"
  }
};
})();
(node as any).hash = '67de4ea3de2f4ebe608f8bd2df2d6b88';
export default node;
