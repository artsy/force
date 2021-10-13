/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Steve_Test_QueryVariables = {};
export type Steve_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"Steve_viewer">;
    } | null;
};
export type Steve_Test_Query = {
    readonly response: Steve_Test_QueryResponse;
    readonly variables: Steve_Test_QueryVariables;
};



/*
query Steve_Test_Query {
  viewer {
    ...Steve_viewer
  }
}

fragment Steve2_sale on Sale {
  is_closed: isClosed
}

fragment Steve_viewer on Viewer {
  standoutLotsConnection: saleArtworksConnection(first: 5, geneIDs: "highlights-at-auction") {
    edges {
      node {
        sale {
          isClosed
          ...Steve2_sale
          id
        }
        id
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Steve_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Steve_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Steve_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "standoutLotsConnection",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5
              },
              {
                "kind": "Literal",
                "name": "geneIDs",
                "value": "highlights-at-auction"
              }
            ],
            "concreteType": "SaleArtworksConnection",
            "kind": "LinkedField",
            "name": "saleArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtwork",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          },
                          {
                            "alias": "is_closed",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleArtworksConnection(first:5,geneIDs:\"highlights-at-auction\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a24aee61ed9d82e43f04187b5db0f63a",
    "id": null,
    "metadata": {},
    "name": "Steve_Test_Query",
    "operationKind": "query",
    "text": "query Steve_Test_Query {\n  viewer {\n    ...Steve_viewer\n  }\n}\n\nfragment Steve2_sale on Sale {\n  is_closed: isClosed\n}\n\nfragment Steve_viewer on Viewer {\n  standoutLotsConnection: saleArtworksConnection(first: 5, geneIDs: \"highlights-at-auction\") {\n    edges {\n      node {\n        sale {\n          isClosed\n          ...Steve2_sale\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '65b2f902b62de72c43b6ef7d5317025e';
export default node;
