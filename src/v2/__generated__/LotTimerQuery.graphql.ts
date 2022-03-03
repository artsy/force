/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LotTimerQueryVariables = {
    saleArtworkID: string;
};
export type LotTimerQueryResponse = {
    readonly saleArtwork: {
        readonly " $fragmentRefs": FragmentRefs<"LotTimer_saleArtwork">;
    } | null;
};
export type LotTimerQuery = {
    readonly response: LotTimerQueryResponse;
    readonly variables: LotTimerQueryVariables;
};



/*
query LotTimerQuery(
  $saleArtworkID: String!
) {
  saleArtwork(id: $saleArtworkID) {
    ...LotTimer_saleArtwork
    id
  }
}

fragment LotTimer_saleArtwork on SaleArtwork {
  endAt
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "saleArtworkID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleArtworkID"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LotTimerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SaleArtwork",
        "kind": "LinkedField",
        "name": "saleArtwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LotTimer_saleArtwork"
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
    "name": "LotTimerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SaleArtwork",
        "kind": "LinkedField",
        "name": "saleArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
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
    "cacheID": "abf8a8115381b2a7351fe4f7fe0c6ee5",
    "id": null,
    "metadata": {},
    "name": "LotTimerQuery",
    "operationKind": "query",
    "text": "query LotTimerQuery(\n  $saleArtworkID: String!\n) {\n  saleArtwork(id: $saleArtworkID) {\n    ...LotTimer_saleArtwork\n    id\n  }\n}\n\nfragment LotTimer_saleArtwork on SaleArtwork {\n  endAt\n}\n"
  }
};
})();
(node as any).hash = '118fecebd1975119ff3df68e6db7fa3d';
export default node;
