/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionsRoutes_AuctionsQueryVariables = {};
export type auctionsRoutes_AuctionsQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_me">;
    } | null;
    readonly currentSales: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_currentSales">;
    } | null;
    readonly pastSales: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_pastSales">;
    } | null;
};
export type auctionsRoutes_AuctionsQuery = {
    readonly response: auctionsRoutes_AuctionsQueryResponse;
    readonly variables: auctionsRoutes_AuctionsQueryVariables;
};



/*
query auctionsRoutes_AuctionsQuery {
  me {
    ...AuctionsApp_me
    id
  }
  currentSales: salesConnection(first: 99, published: true, sort: START_AT_ASC) {
    ...AuctionsApp_currentSales
  }
  pastSales: salesConnection(first: 20, published: true, live: false, sort: START_AT_ASC) {
    ...AuctionsApp_pastSales
  }
}

fragment AuctionsApp_currentSales on SaleConnection {
  edges {
    node {
      id
    }
  }
}

fragment AuctionsApp_me on Me {
  id
}

fragment AuctionsApp_pastSales on SaleConnection {
  edges {
    node {
      name
      formattedStartDateTime
      href
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "published",
  "value": true
},
v1 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_ASC"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 99
  },
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  {
    "kind": "Literal",
    "name": "live",
    "value": false
  },
  (v0/*: any*/),
  (v1/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionsRoutes_AuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionsApp_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "currentSales",
        "args": (v2/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionsApp_currentSales"
          }
        ],
        "storageKey": "salesConnection(first:99,published:true,sort:\"START_AT_ASC\")"
      },
      {
        "alias": "pastSales",
        "args": (v3/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionsApp_pastSales"
          }
        ],
        "storageKey": "salesConnection(first:20,live:false,published:true,sort:\"START_AT_ASC\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "auctionsRoutes_AuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "currentSales",
        "args": (v2/*: any*/),
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
                "selections": (v5/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "salesConnection(first:99,published:true,sort:\"START_AT_ASC\")"
      },
      {
        "alias": "pastSales",
        "args": (v3/*: any*/),
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
                    "name": "name",
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
                    "name": "href",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "salesConnection(first:20,live:false,published:true,sort:\"START_AT_ASC\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "auctionsRoutes_AuctionsQuery",
    "operationKind": "query",
    "text": "query auctionsRoutes_AuctionsQuery {\n  me {\n    ...AuctionsApp_me\n    id\n  }\n  currentSales: salesConnection(first: 99, published: true, sort: START_AT_ASC) {\n    ...AuctionsApp_currentSales\n  }\n  pastSales: salesConnection(first: 20, published: true, live: false, sort: START_AT_ASC) {\n    ...AuctionsApp_pastSales\n  }\n}\n\nfragment AuctionsApp_currentSales on SaleConnection {\n  edges {\n    node {\n      id\n    }\n  }\n}\n\nfragment AuctionsApp_me on Me {\n  id\n}\n\nfragment AuctionsApp_pastSales on SaleConnection {\n  edges {\n    node {\n      name\n      formattedStartDateTime\n      href\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ca3d073a179691367a5fdd353799c237';
export default node;
