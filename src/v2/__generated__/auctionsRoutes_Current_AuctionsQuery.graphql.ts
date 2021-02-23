/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionsRoutes_Current_AuctionsQueryVariables = {};
export type auctionsRoutes_Current_AuctionsQueryResponse = {
    readonly currentAuctions: {
        readonly " $fragmentRefs": FragmentRefs<"CurrentAuctions_currentAuctions">;
    } | null;
};
export type auctionsRoutes_Current_AuctionsQuery = {
    readonly response: auctionsRoutes_Current_AuctionsQueryResponse;
    readonly variables: auctionsRoutes_Current_AuctionsQueryVariables;
};



/*
query auctionsRoutes_Current_AuctionsQuery {
  currentAuctions: salesConnection(first: 99, published: true, sort: START_AT_ASC) {
    ...CurrentAuctions_currentAuctions
  }
}

fragment CurrentAuctions_currentAuctions on SaleConnection {
  edges {
    node {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 99
  },
  {
    "kind": "Literal",
    "name": "published",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "START_AT_ASC"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionsRoutes_Current_AuctionsQuery",
    "selections": [
      {
        "alias": "currentAuctions",
        "args": (v0/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CurrentAuctions_currentAuctions"
          }
        ],
        "storageKey": "salesConnection(first:99,published:true,sort:\"START_AT_ASC\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "auctionsRoutes_Current_AuctionsQuery",
    "selections": [
      {
        "alias": "currentAuctions",
        "args": (v0/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
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
        "storageKey": "salesConnection(first:99,published:true,sort:\"START_AT_ASC\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "auctionsRoutes_Current_AuctionsQuery",
    "operationKind": "query",
    "text": "query auctionsRoutes_Current_AuctionsQuery {\n  currentAuctions: salesConnection(first: 99, published: true, sort: START_AT_ASC) {\n    ...CurrentAuctions_currentAuctions\n  }\n}\n\nfragment CurrentAuctions_currentAuctions on SaleConnection {\n  edges {\n    node {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b0991a10a415f8f2e819e82e1403bce0';
export default node;
