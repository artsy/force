/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RejectTestQueryVariables = {};
export type RejectTestQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"Reject_order">;
    } | null;
};
export type RejectTestQueryRawResponse = {
    readonly order: ({
        readonly __typename: "CommerceOfferOrder";
        readonly internalID: string;
        readonly stateExpiresAt: string | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly id: string | null;
                        readonly artistNames: string | null;
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
                        readonly image: ({
                            readonly resized_ArtworkSummaryItem: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly sellerDetails: ({
            readonly __typename: "Partner";
            readonly id: string | null;
            readonly name: string | null;
        } | {
            readonly __typename: string | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
        readonly lastOffer: ({
            readonly internalID: string;
            readonly createdAt: string;
            readonly id: string | null;
        }) | null;
    } | {
        readonly __typename: string | null;
        readonly internalID: string;
        readonly stateExpiresAt: string | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly id: string | null;
                        readonly artistNames: string | null;
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
                        readonly image: ({
                            readonly resized_ArtworkSummaryItem: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly sellerDetails: ({
            readonly __typename: "Partner";
            readonly id: string | null;
            readonly name: string | null;
        } | {
            readonly __typename: string | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type RejectTestQuery = {
    readonly response: RejectTestQueryResponse;
    readonly variables: RejectTestQueryVariables;
    readonly rawResponse: RejectTestQueryRawResponse;
};



/*
query RejectTestQuery {
  order: commerceOrder(id: "unused") {
    __typename
    ...Reject_order
    id
  }
}

fragment ArtworkSummaryItem_order on CommerceOrder {
  sellerDetails {
    __typename
    ... on Partner {
      name
    }
    ... on Node {
      id
    }
    ... on User {
      id
    }
  }
  lineItems {
    edges {
      node {
        artwork {
          artistNames
          title
          date
          shippingOrigin
          image {
            resized_ArtworkSummaryItem: resized(width: 55) {
              url
            }
          }
          id
        }
        id
      }
    }
  }
}

fragment Reject_order on CommerceOrder {
  internalID
  stateExpiresAt
  lineItems {
    edges {
      node {
        artwork {
          slug
          id
        }
        id
      }
    }
  }
  ... on CommerceOfferOrder {
    lastOffer {
      internalID
      createdAt
      id
    }
  }
  ...ArtworkSummaryItem_order
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v6 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RejectTestQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Reject_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RejectTestQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stateExpiresAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CommerceLineItemConnection",
            "kind": "LinkedField",
            "name": "lineItems",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceLineItemEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommerceLineItem",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "artwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artistNames",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "shippingOrigin",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "resized_ArtworkSummaryItem",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 55
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "resized(width:55)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sellerDetails",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "type": "Partner"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "order": {
          "type": "CommerceOrder",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.id": (v4/*: any*/),
        "order.internalID": (v5/*: any*/),
        "order.stateExpiresAt": (v6/*: any*/),
        "order.lineItems": {
          "type": "CommerceLineItemConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges": {
          "type": "CommerceLineItemEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "order.lastOffer": {
          "type": "CommerceOffer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.sellerDetails": {
          "type": "OrderParty",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node": {
          "type": "CommerceLineItem",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lastOffer.internalID": (v5/*: any*/),
        "order.lastOffer.createdAt": (v7/*: any*/),
        "order.lastOffer.id": (v4/*: any*/),
        "order.lineItems.edges.node.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.id": (v4/*: any*/),
        "order.sellerDetails.name": (v6/*: any*/),
        "order.sellerDetails.id": (v4/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v5/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v4/*: any*/),
        "order.lineItems.edges.node.artwork.artistNames": (v6/*: any*/),
        "order.lineItems.edges.node.artwork.title": (v6/*: any*/),
        "order.lineItems.edges.node.artwork.date": (v6/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v6/*: any*/),
        "order.lineItems.edges.node.artwork.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.artwork.image.resized_ArtworkSummaryItem": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.artwork.image.resized_ArtworkSummaryItem.url": (v7/*: any*/)
      }
    },
    "name": "RejectTestQuery",
    "operationKind": "query",
    "text": "query RejectTestQuery {\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...Reject_order\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      id\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artistNames\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment Reject_order on CommerceOrder {\n  internalID\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      createdAt\n      id\n    }\n  }\n  ...ArtworkSummaryItem_order\n}\n"
  }
};
})();
(node as any).hash = '1fea81db691344a303923dda1923afb5';
export default node;
