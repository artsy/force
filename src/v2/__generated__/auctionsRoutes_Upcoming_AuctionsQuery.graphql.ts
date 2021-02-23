/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionsRoutes_Upcoming_AuctionsQueryVariables = {};
export type auctionsRoutes_Upcoming_AuctionsQueryResponse = {
    readonly upcomingAuctions: {
        readonly " $fragmentRefs": FragmentRefs<"UpcomingAuctions_upcomingAuctions">;
    } | null;
};
export type auctionsRoutes_Upcoming_AuctionsQuery = {
    readonly response: auctionsRoutes_Upcoming_AuctionsQueryResponse;
    readonly variables: auctionsRoutes_Upcoming_AuctionsQueryVariables;
};



/*
query auctionsRoutes_Upcoming_AuctionsQuery {
  upcomingAuctions: salesConnection(first: 99, published: true, sort: START_AT_ASC) {
    ...UpcomingAuctions_upcomingAuctions
  }
}

fragment UpcomingAuctions_upcomingAuctions on SaleConnection {
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
    "name": "auctionsRoutes_Upcoming_AuctionsQuery",
    "selections": [
      {
        "alias": "upcomingAuctions",
        "args": (v0/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UpcomingAuctions_upcomingAuctions"
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
    "name": "auctionsRoutes_Upcoming_AuctionsQuery",
    "selections": [
      {
        "alias": "upcomingAuctions",
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
    "name": "auctionsRoutes_Upcoming_AuctionsQuery",
    "operationKind": "query",
    "text": "query auctionsRoutes_Upcoming_AuctionsQuery {\n  upcomingAuctions: salesConnection(first: 99, published: true, sort: START_AT_ASC) {\n    ...UpcomingAuctions_upcomingAuctions\n  }\n}\n\nfragment UpcomingAuctions_upcomingAuctions on SaleConnection {\n  edges {\n    node {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '14dd637a87c0f8035a46ebb135ef9d1e';
export default node;
