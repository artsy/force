/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CellSaleStoryQueryVariables = {};
export type CellSaleStoryQueryResponse = {
    readonly viewer: {
        readonly salesConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly " $fragmentRefs": FragmentRefs<"CellSale_sale">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type CellSaleStoryQuery = {
    readonly response: CellSaleStoryQueryResponse;
    readonly variables: CellSaleStoryQueryVariables;
};



/*
query CellSaleStoryQuery {
  viewer {
    salesConnection(first: 99, published: true, live: true, sort: LICENSED_TIMELY_AT_NAME_DESC) {
      edges {
        node {
          ...CellSale_sale
          id
        }
      }
    }
  }
}

fragment CellSale_sale on Sale {
  name
  formattedStartDateTime
  href
  coverImage {
    cropped(width: 445, height: 334, version: ["normalized", "larger", "large"]) {
      src
      srcSet
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
    "name": "live",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "published",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "LICENSED_TIMELY_AT_NAME_DESC"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CellSaleStoryQuery",
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
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "CellSale_sale"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "salesConnection(first:99,live:true,published:true,sort:\"LICENSED_TIMELY_AT_NAME_DESC\")"
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
    "name": "CellSaleStoryQuery",
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 334
                              },
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "normalized",
                                  "larger",
                                  "large"
                                ]
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 445
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "src",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "srcSet",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "cropped(height:334,version:[\"normalized\",\"larger\",\"large\"],width:445)"
                          }
                        ],
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
            "storageKey": "salesConnection(first:99,live:true,published:true,sort:\"LICENSED_TIMELY_AT_NAME_DESC\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d935f9519d0e1ca700cf595bfecc71c1",
    "id": null,
    "metadata": {},
    "name": "CellSaleStoryQuery",
    "operationKind": "query",
    "text": "query CellSaleStoryQuery {\n  viewer {\n    salesConnection(first: 99, published: true, live: true, sort: LICENSED_TIMELY_AT_NAME_DESC) {\n      edges {\n        node {\n          ...CellSale_sale\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment CellSale_sale on Sale {\n  name\n  formattedStartDateTime\n  href\n  coverImage {\n    cropped(width: 445, height: 334, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9ea03b12a5d927b87c70ebdacfd48be3';
export default node;
