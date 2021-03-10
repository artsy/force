/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionsRoutes_Past_AuctionsQueryVariables = {};
export type auctionsRoutes_Past_AuctionsQueryResponse = {
    readonly salesConnection: {
        readonly " $fragmentRefs": FragmentRefs<"PastAuctions_salesConnection">;
    } | null;
};
export type auctionsRoutes_Past_AuctionsQuery = {
    readonly response: auctionsRoutes_Past_AuctionsQueryResponse;
    readonly variables: auctionsRoutes_Past_AuctionsQueryVariables;
};



/*
query auctionsRoutes_Past_AuctionsQuery {
  salesConnection(first: 99, published: true, sort: START_AT_ASC) {
    ...PastAuctions_salesConnection
  }
}

fragment AuctionArtworksRail_sale on Sale {
  internalID
  slug
  href
  name
  formattedStartDateTime
}

fragment PastAuctions_salesConnection on SaleConnection {
  edges {
    node {
      slug
      name
      href
      liveStartAt
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
    "name": "auctionsRoutes_Past_AuctionsQuery",
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
            "name": "PastAuctions_salesConnection"
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
    "name": "auctionsRoutes_Past_AuctionsQuery",
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
                    "name": "liveStartAt",
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
    "name": "auctionsRoutes_Past_AuctionsQuery",
    "operationKind": "query",
    "text": "query auctionsRoutes_Past_AuctionsQuery {\n  salesConnection(first: 99, published: true, sort: START_AT_ASC) {\n    ...PastAuctions_salesConnection\n  }\n}\n\nfragment AuctionArtworksRail_sale on Sale {\n  internalID\n  slug\n  href\n  name\n  formattedStartDateTime\n}\n\nfragment PastAuctions_salesConnection on SaleConnection {\n  edges {\n    node {\n      slug\n      name\n      href\n      liveStartAt\n      ...AuctionArtworksRail_sale\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0d10abf90bce57d87d2b2a141c5049ae';
export default node;
