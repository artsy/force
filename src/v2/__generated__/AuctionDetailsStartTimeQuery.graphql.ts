/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionDetailsStartTimeQueryVariables = {
    id: string;
};
export type AuctionDetailsStartTimeQueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionDetailsStartTime_sale">;
    } | null;
};
export type AuctionDetailsStartTimeQuery = {
    readonly response: AuctionDetailsStartTimeQueryResponse;
    readonly variables: AuctionDetailsStartTimeQueryVariables;
};



/*
query AuctionDetailsStartTimeQuery(
  $id: String!
) {
  sale(id: $id) {
    ...AuctionDetailsStartTime_sale
    id
  }
}

fragment AuctionDetailsStartTime_sale on Sale {
  formattedStartDateTime
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionDetailsStartTimeQuery",
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
            "name": "AuctionDetailsStartTime_sale"
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
    "name": "AuctionDetailsStartTimeQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedStartDateTime",
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
    "cacheID": "8692e160478aff17408b2070b7b9d03d",
    "id": null,
    "metadata": {},
    "name": "AuctionDetailsStartTimeQuery",
    "operationKind": "query",
    "text": "query AuctionDetailsStartTimeQuery(\n  $id: String!\n) {\n  sale(id: $id) {\n    ...AuctionDetailsStartTime_sale\n    id\n  }\n}\n\nfragment AuctionDetailsStartTime_sale on Sale {\n  formattedStartDateTime\n}\n"
  }
};
})();
(node as any).hash = 'ee26b80f9f33707dc69c5b7c1c6cef6a';
export default node;
