/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionsRoutes_Current_AuctionsQueryVariables = {};
export type auctionsRoutes_Current_AuctionsQueryResponse = {
    readonly salesConnection: {
        readonly " $fragmentRefs": FragmentRefs<"CurrentAuctions_salesConnection">;
    } | null;
};
export type auctionsRoutes_Current_AuctionsQuery = {
    readonly response: auctionsRoutes_Current_AuctionsQueryResponse;
    readonly variables: auctionsRoutes_Current_AuctionsQueryVariables;
};



/*
query auctionsRoutes_Current_AuctionsQuery {
  salesConnection(first: 99, published: true, sort: START_AT_ASC) {
    ...CurrentAuctions_salesConnection
  }
}

fragment AuctionArtworksRail_sale on Sale {
  internalID
  slug
  href
  name
  formattedStartDateTime
}

fragment CurrentAuctions_salesConnection on SaleConnection {
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
    "name": "auctionsRoutes_Current_AuctionsQuery",
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
            "name": "CurrentAuctions_salesConnection"
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
    "name": "auctionsRoutes_Current_AuctionsQuery",
    "operationKind": "query",
    "text": "query auctionsRoutes_Current_AuctionsQuery {\n  salesConnection(first: 99, published: true, sort: START_AT_ASC) {\n    ...CurrentAuctions_salesConnection\n  }\n}\n\nfragment AuctionArtworksRail_sale on Sale {\n  internalID\n  slug\n  href\n  name\n  formattedStartDateTime\n}\n\nfragment CurrentAuctions_salesConnection on SaleConnection {\n  edges {\n    node {\n      slug\n      name\n      href\n      liveStartAt\n      ...AuctionArtworksRail_sale\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e821a49dbc59ae0d27f8ef0c91837636';
export default node;
