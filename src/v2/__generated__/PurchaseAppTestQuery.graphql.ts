/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PENDING" | "PROCESSING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type PurchaseAppTestQueryVariables = {};
export type PurchaseAppTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"PurchaseApp_me">;
    } | null;
};
export type PurchaseAppTestQueryRawResponse = {
    readonly me: ({
        readonly name: string | null;
        readonly orders: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly __typename: string;
                    readonly code: string;
                    readonly __isCommerceOrder: string;
                    readonly internalID: string;
                    readonly displayState: CommerceOrderDisplayStateEnum;
                    readonly state: CommerceOrderStateEnum;
                    readonly mode: CommerceOrderModeEnum | null;
                    readonly requestedFulfillment: ({
                        readonly __typename: string;
                    }) | null;
                    readonly creditCard: ({
                        readonly lastDigits: string;
                        readonly id: string;
                    }) | null;
                    readonly buyerTotal: string | null;
                    readonly createdAt: string;
                    readonly itemsTotal: string | null;
                    readonly currencyCode: string;
                    readonly lineItems: ({
                        readonly edges: ReadonlyArray<({
                            readonly node: ({
                                readonly artwork: ({
                                    readonly slug: string;
                                    readonly date: string | null;
                                    readonly image: ({
                                        readonly resized: ({
                                            readonly url: string;
                                        }) | null;
                                    }) | null;
                                    readonly partner: ({
                                        readonly href: string | null;
                                        readonly initials: string | null;
                                        readonly name: string | null;
                                        readonly profile: ({
                                            readonly icon: ({
                                                readonly url: string | null;
                                            }) | null;
                                            readonly id: string;
                                        }) | null;
                                        readonly id: string;
                                    }) | null;
                                    readonly shippingOrigin: string | null;
                                    readonly internalID: string;
                                    readonly title: string | null;
                                    readonly artistNames: string | null;
                                    readonly artists: ReadonlyArray<({
                                        readonly slug: string;
                                        readonly id: string;
                                    }) | null> | null;
                                    readonly id: string;
                                }) | null;
                                readonly fulfillments: ({
                                    readonly edges: ReadonlyArray<({
                                        readonly node: ({
                                            readonly trackingId: string | null;
                                            readonly id: string;
                                        }) | null;
                                    }) | null> | null;
                                }) | null;
                                readonly id: string;
                            }) | null;
                        }) | null> | null;
                    }) | null;
                    readonly id: string;
                }) | null;
            }) | null> | null;
            readonly pageCursors: ({
                readonly around: ReadonlyArray<{
                    readonly cursor: string;
                    readonly isCurrent: boolean;
                    readonly page: number;
                }>;
                readonly first: ({
                    readonly cursor: string;
                    readonly isCurrent: boolean;
                    readonly page: number;
                }) | null;
                readonly last: ({
                    readonly cursor: string;
                    readonly isCurrent: boolean;
                    readonly page: number;
                }) | null;
                readonly previous: ({
                    readonly cursor: string;
                    readonly isCurrent: boolean;
                    readonly page: number;
                }) | null;
            }) | null;
            readonly pageInfo: {
                readonly endCursor: string | null;
                readonly hasNextPage: boolean;
                readonly hasPreviousPage: boolean;
                readonly startCursor: string | null;
            };
        }) | null;
        readonly id: string;
    }) | null;
};
export type PurchaseAppTestQuery = {
    readonly response: PurchaseAppTestQueryResponse;
    readonly variables: PurchaseAppTestQueryVariables;
    readonly rawResponse: PurchaseAppTestQueryRawResponse;
};



/*
query PurchaseAppTestQuery {
  me {
    ...PurchaseApp_me
    id
  }
}

fragment OrderRow_order on CommerceOrder {
  __isCommerceOrder: __typename
  internalID
  code
  displayState
  state
  mode
  requestedFulfillment {
    __typename
    ... on CommerceShip {
      __typename
    }
    ... on CommercePickup {
      __typename
    }
    ... on CommerceShipArta {
      __typename
    }
  }
  creditCard {
    lastDigits
    id
  }
  buyerTotal(precision: 2)
  createdAt
  itemsTotal
  currencyCode
  lineItems {
    edges {
      node {
        artwork {
          slug
          date
          image {
            resized(width: 55) {
              url
            }
          }
          partner {
            href
            initials
            name
            profile {
              icon {
                url(version: "square140")
              }
              id
            }
            id
          }
          shippingOrigin
          internalID
          title
          artistNames
          artists {
            slug
            id
          }
          id
        }
        fulfillments(first: 1) {
          edges {
            node {
              trackingId
              id
            }
          }
        }
        id
      }
    }
  }
}

fragment PurchaseApp_me on Me {
  ...PurchaseHistory_me
}

fragment PurchaseHistory_me on Me {
  name
  orders(states: [APPROVED, CANCELED, FULFILLED, REFUNDED, SUBMITTED], first: 10) {
    edges {
      node {
        __typename
        code
        ...OrderRow_order
        id
      }
    }
    pageCursors {
      around {
        cursor
        isCurrent
        page
      }
      first {
        cursor
        isCurrent
        page
      }
      last {
        cursor
        isCurrent
        page
      }
      previous {
        cursor
        isCurrent
        page
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cursor",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "page",
    "storageKey": null
  }
],
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommercePageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PurchaseAppTestQuery",
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
            "name": "PurchaseApp_me"
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
    "name": "PurchaseAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "APPROVED",
                  "CANCELED",
                  "FULFILLED",
                  "REFUNDED",
                  "SUBMITTED"
                ]
              }
            ],
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orders",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOrderEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "code",
                        "storageKey": null
                      },
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isCommerceOrder"
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayState",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "state",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "requestedFulfillment",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "kind": "LinkedField",
                        "name": "creditCard",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lastDigits",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "precision",
                            "value": 2
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "buyerTotal",
                        "storageKey": "buyerTotal(precision:2)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "itemsTotal",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "currencyCode",
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
                                      (v4/*: any*/),
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
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "image",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
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
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Partner",
                                        "kind": "LinkedField",
                                        "name": "partner",
                                        "plural": false,
                                        "selections": [
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
                                            "name": "initials",
                                            "storageKey": null
                                          },
                                          (v0/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Profile",
                                            "kind": "LinkedField",
                                            "name": "profile",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Image",
                                                "kind": "LinkedField",
                                                "name": "icon",
                                                "plural": false,
                                                "selections": [
                                                  {
                                                    "alias": null,
                                                    "args": [
                                                      {
                                                        "kind": "Literal",
                                                        "name": "version",
                                                        "value": "square140"
                                                      }
                                                    ],
                                                    "kind": "ScalarField",
                                                    "name": "url",
                                                    "storageKey": "url(version:\"square140\")"
                                                  }
                                                ],
                                                "storageKey": null
                                              },
                                              (v3/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v3/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "shippingOrigin",
                                        "storageKey": null
                                      },
                                      (v2/*: any*/),
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
                                        "name": "artistNames",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Artist",
                                        "kind": "LinkedField",
                                        "name": "artists",
                                        "plural": true,
                                        "selections": [
                                          (v4/*: any*/),
                                          (v3/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v3/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "first",
                                        "value": 1
                                      }
                                    ],
                                    "concreteType": "CommerceFulfillmentConnection",
                                    "kind": "LinkedField",
                                    "name": "fulfillments",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CommerceFulfillmentEdge",
                                        "kind": "LinkedField",
                                        "name": "edges",
                                        "plural": true,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "CommerceFulfillment",
                                            "kind": "LinkedField",
                                            "name": "node",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "trackingId",
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
                                    "storageKey": "fulfillments(first:1)"
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommercePageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommercePageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:10,states:[\"APPROVED\",\"CANCELED\",\"FULFILLED\",\"REFUNDED\",\"SUBMITTED\"])"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e9a433f1acb71bde359f7be6e4818e90",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v6/*: any*/),
        "me.name": (v7/*: any*/),
        "me.orders": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "me.orders.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "me.orders.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "me.orders.edges.node.__isCommerceOrder": (v8/*: any*/),
        "me.orders.edges.node.__typename": (v8/*: any*/),
        "me.orders.edges.node.buyerTotal": (v7/*: any*/),
        "me.orders.edges.node.code": (v8/*: any*/),
        "me.orders.edges.node.createdAt": (v8/*: any*/),
        "me.orders.edges.node.creditCard": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCard"
        },
        "me.orders.edges.node.creditCard.id": (v6/*: any*/),
        "me.orders.edges.node.creditCard.lastDigits": (v8/*: any*/),
        "me.orders.edges.node.currencyCode": (v8/*: any*/),
        "me.orders.edges.node.displayState": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "IN_TRANSIT",
            "PENDING",
            "PROCESSING",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderDisplayStateEnum"
        },
        "me.orders.edges.node.id": (v6/*: any*/),
        "me.orders.edges.node.internalID": (v6/*: any*/),
        "me.orders.edges.node.itemsTotal": (v7/*: any*/),
        "me.orders.edges.node.lineItems": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItemConnection"
        },
        "me.orders.edges.node.lineItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItemEdge"
        },
        "me.orders.edges.node.lineItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItem"
        },
        "me.orders.edges.node.lineItems.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.artistNames": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.artists.id": (v6/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artists.slug": (v6/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.date": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.id": (v6/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.image": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.image.resized.url": (v8/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.internalID": (v6/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.href": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.id": (v6/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.initials": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.name": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.url": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.id": (v6/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.shippingOrigin": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.slug": (v6/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.title": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceFulfillmentConnection"
        },
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceFulfillmentEdge"
        },
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceFulfillment"
        },
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node.id": (v6/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node.trackingId": (v7/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.id": (v6/*: any*/),
        "me.orders.edges.node.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "me.orders.edges.node.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "me.orders.edges.node.requestedFulfillment.__typename": (v8/*: any*/),
        "me.orders.edges.node.state": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "PENDING",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderStateEnum"
        },
        "me.orders.pageCursors": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommercePageCursors"
        },
        "me.orders.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "CommercePageCursor"
        },
        "me.orders.pageCursors.around.cursor": (v8/*: any*/),
        "me.orders.pageCursors.around.isCurrent": (v10/*: any*/),
        "me.orders.pageCursors.around.page": (v11/*: any*/),
        "me.orders.pageCursors.first": (v12/*: any*/),
        "me.orders.pageCursors.first.cursor": (v8/*: any*/),
        "me.orders.pageCursors.first.isCurrent": (v10/*: any*/),
        "me.orders.pageCursors.first.page": (v11/*: any*/),
        "me.orders.pageCursors.last": (v12/*: any*/),
        "me.orders.pageCursors.last.cursor": (v8/*: any*/),
        "me.orders.pageCursors.last.isCurrent": (v10/*: any*/),
        "me.orders.pageCursors.last.page": (v11/*: any*/),
        "me.orders.pageCursors.previous": (v12/*: any*/),
        "me.orders.pageCursors.previous.cursor": (v8/*: any*/),
        "me.orders.pageCursors.previous.isCurrent": (v10/*: any*/),
        "me.orders.pageCursors.previous.page": (v11/*: any*/),
        "me.orders.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommercePageInfo"
        },
        "me.orders.pageInfo.endCursor": (v7/*: any*/),
        "me.orders.pageInfo.hasNextPage": (v10/*: any*/),
        "me.orders.pageInfo.hasPreviousPage": (v10/*: any*/),
        "me.orders.pageInfo.startCursor": (v7/*: any*/)
      }
    },
    "name": "PurchaseAppTestQuery",
    "operationKind": "query",
    "text": "query PurchaseAppTestQuery {\n  me {\n    ...PurchaseApp_me\n    id\n  }\n}\n\nfragment OrderRow_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  code\n  displayState\n  state\n  mode\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      __typename\n    }\n    ... on CommercePickup {\n      __typename\n    }\n    ... on CommerceShipArta {\n      __typename\n    }\n  }\n  creditCard {\n    lastDigits\n    id\n  }\n  buyerTotal(precision: 2)\n  createdAt\n  itemsTotal\n  currencyCode\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          date\n          image {\n            resized(width: 55) {\n              url\n            }\n          }\n          partner {\n            href\n            initials\n            name\n            profile {\n              icon {\n                url(version: \"square140\")\n              }\n              id\n            }\n            id\n          }\n          shippingOrigin\n          internalID\n          title\n          artistNames\n          artists {\n            slug\n            id\n          }\n          id\n        }\n        fulfillments(first: 1) {\n          edges {\n            node {\n              trackingId\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment PurchaseApp_me on Me {\n  ...PurchaseHistory_me\n}\n\nfragment PurchaseHistory_me on Me {\n  name\n  orders(states: [APPROVED, CANCELED, FULFILLED, REFUNDED, SUBMITTED], first: 10) {\n    edges {\n      node {\n        __typename\n        code\n        ...OrderRow_order\n        id\n      }\n    }\n    pageCursors {\n      around {\n        cursor\n        isCurrent\n        page\n      }\n      first {\n        cursor\n        isCurrent\n        page\n      }\n      last {\n        cursor\n        isCurrent\n        page\n      }\n      previous {\n        cursor\n        isCurrent\n        page\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8419988df9011e3e1107b9bea612aba6';
export default node;
