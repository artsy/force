/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionsRoutes_Upcoming_AuctionsQueryVariables = {};
export type auctionsRoutes_Upcoming_AuctionsQueryResponse = {
    readonly salesConnection: {
        readonly " $fragmentRefs": FragmentRefs<"UpcomingAuctions_salesConnection">;
    } | null;
};
export type auctionsRoutes_Upcoming_AuctionsQuery = {
    readonly response: auctionsRoutes_Upcoming_AuctionsQueryResponse;
    readonly variables: auctionsRoutes_Upcoming_AuctionsQueryVariables;
};



/*
query auctionsRoutes_Upcoming_AuctionsQuery {
  salesConnection(first: 25, live: true, published: false, sort: END_AT_ASC) {
    ...UpcomingAuctions_salesConnection
  }
}

fragment AuctionArtworksRail_sale on Sale {
  internalID
  slug
  href
  name
  formattedStartDateTime
}

fragment UpcomingAuctions_salesConnection on SaleConnection {
  edges {
    node {
      slug
      name
      href
      status
      formattedStartDateTime
      eventStartAt
      ...AuctionArtworksRail_sale
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
    "value": 25
  },
  {
    "kind": "Literal",
    "name": "live",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "published",
    "value": false
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "END_AT_ASC"
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
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UpcomingAuctions_salesConnection"
          }
        ],
        "storageKey": "salesConnection(first:25,live:true,published:false,sort:\"END_AT_ASC\")"
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
        "alias": null,
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
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "href",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
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
                    "name": "eventStartAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internalID",
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
        "storageKey": "salesConnection(first:25,live:true,published:false,sort:\"END_AT_ASC\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "auctionsRoutes_Upcoming_AuctionsQuery",
    "operationKind": "query",
    "text": "query auctionsRoutes_Upcoming_AuctionsQuery {\n  salesConnection(first: 25, live: true, published: false, sort: END_AT_ASC) {\n    ...UpcomingAuctions_salesConnection\n  }\n}\n\nfragment AuctionArtworksRail_sale on Sale {\n  internalID\n  slug\n  href\n  name\n  formattedStartDateTime\n}\n\nfragment UpcomingAuctions_salesConnection on SaleConnection {\n  edges {\n    node {\n      slug\n      name\n      href\n      status\n      formattedStartDateTime\n      eventStartAt\n      ...AuctionArtworksRail_sale\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c91583182ed4335ec9cdaf69b09e887a';
export default node;
