/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPurchases_Test_QueryVariables = {};
export type SettingsPurchases_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsPurchases_me">;
    } | null;
};
export type SettingsPurchases_Test_Query = {
    readonly response: SettingsPurchases_Test_QueryResponse;
    readonly variables: SettingsPurchases_Test_QueryVariables;
};



/*
query SettingsPurchases_Test_Query {
  me {
    ...SettingsPurchases_me
    id
  }
}

fragment CommercePagination_pageCursors on CommercePageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
  }
}

fragment SettingsPurchasesRow_order on CommerceOrder {
  internalID
  code
  displayState
  state
  requestedFulfillment {
    __typename
  }
  creditCard {
    lastDigits
    id
  }
  buyerTotal(precision: 2)
  createdAt
  currencyCode
  lineItems {
    edges {
      node {
        artwork {
          href
          image {
            cropped(width: 45, height: 45) {
              src
              srcSet
            }
          }
          partner {
            href
            initials
            name
            profile {
              icon {
                cropped(width: 45, height: 45) {
                  src
                  srcSet
                }
              }
              id
            }
            id
          }
          shippingOrigin
          title
          artistNames
          artists {
            href
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

fragment SettingsPurchases_me on Me {
  name
  orders(states: [APPROVED, CANCELED, FULFILLED, REFUNDED, SUBMITTED], first: 10) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...CommercePagination_pageCursors
    }
    edges {
      node {
        __typename
        code
        ...SettingsPurchasesRow_order
        id
      }
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
  "name": "cursor",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 45
      },
      {
        "kind": "Literal",
        "name": "width",
        "value": 45
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
    "storageKey": "cropped(height:45,width:45)"
  }
],
v8 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v11 = {
  "type": "CommercePageCursor",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v13 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v14 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsPurchases_Test_Query",
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
            "name": "SettingsPurchases_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsPurchases_Test_Query",
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
                "kind": "ScalarField",
                "name": "totalCount",
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
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
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
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "code",
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
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "requestedFulfillment",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/)
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
                          (v5/*: any*/)
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
                                      (v6/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "image",
                                        "plural": false,
                                        "selections": (v7/*: any*/),
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
                                          (v6/*: any*/),
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
                                                "selections": (v7/*: any*/),
                                                "storageKey": null
                                              },
                                              (v5/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v5/*: any*/)
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
                                          (v6/*: any*/),
                                          (v5/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v5/*: any*/)
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
                                              (v5/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": "fulfillments(first:1)"
                                  },
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:10,states:[\"APPROVED\",\"CANCELED\",\"FULFILLED\",\"REFUNDED\",\"SUBMITTED\"])"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v8/*: any*/),
        "me.name": (v9/*: any*/),
        "me.orders": {
          "type": "CommerceOrderConnectionWithTotalCount",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.totalCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.pageInfo": {
          "type": "CommercePageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.orders.pageCursors": {
          "type": "CommercePageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges": {
          "type": "CommerceOrderEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.orders.pageInfo.hasNextPage": (v10/*: any*/),
        "me.orders.pageInfo.endCursor": (v9/*: any*/),
        "me.orders.edges.node": {
          "type": "CommerceOrder",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.pageCursors.around": {
          "type": "CommercePageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "me.orders.pageCursors.first": (v11/*: any*/),
        "me.orders.pageCursors.last": (v11/*: any*/),
        "me.orders.pageCursors.previous": (v11/*: any*/),
        "me.orders.edges.node.code": (v12/*: any*/),
        "me.orders.edges.node.id": (v8/*: any*/),
        "me.orders.pageCursors.around.cursor": (v12/*: any*/),
        "me.orders.pageCursors.around.page": (v13/*: any*/),
        "me.orders.pageCursors.around.isCurrent": (v10/*: any*/),
        "me.orders.pageCursors.first.cursor": (v12/*: any*/),
        "me.orders.pageCursors.first.page": (v13/*: any*/),
        "me.orders.pageCursors.first.isCurrent": (v10/*: any*/),
        "me.orders.pageCursors.last.cursor": (v12/*: any*/),
        "me.orders.pageCursors.last.page": (v13/*: any*/),
        "me.orders.pageCursors.last.isCurrent": (v10/*: any*/),
        "me.orders.pageCursors.previous.cursor": (v12/*: any*/),
        "me.orders.pageCursors.previous.page": (v13/*: any*/),
        "me.orders.edges.node.internalID": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.orders.edges.node.displayState": {
          "type": "CommerceOrderDisplayStateEnum",
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
          "plural": false,
          "nullable": false
        },
        "me.orders.edges.node.state": {
          "type": "CommerceOrderStateEnum",
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "PENDING",
            "REFUNDED",
            "SUBMITTED"
          ],
          "plural": false,
          "nullable": false
        },
        "me.orders.edges.node.requestedFulfillment": {
          "type": "CommerceRequestedFulfillmentUnion",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.creditCard": {
          "type": "CreditCard",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.buyerTotal": (v9/*: any*/),
        "me.orders.edges.node.createdAt": (v12/*: any*/),
        "me.orders.edges.node.currencyCode": (v12/*: any*/),
        "me.orders.edges.node.lineItems": {
          "type": "CommerceLineItemConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.requestedFulfillment.__typename": (v12/*: any*/),
        "me.orders.edges.node.creditCard.lastDigits": (v12/*: any*/),
        "me.orders.edges.node.creditCard.id": (v8/*: any*/),
        "me.orders.edges.node.lineItems.edges": {
          "type": "CommerceLineItemEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node": {
          "type": "CommerceLineItem",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node.fulfillments": {
          "type": "CommerceFulfillmentConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node.id": (v8/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.href": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.image": (v14/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.shippingOrigin": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.title": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artistNames": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.id": (v8/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges": {
          "type": "CommerceFulfillmentEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.image.cropped": (v15/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.href": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.initials": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.name": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.id": (v8/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artists.href": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artists.id": (v8/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node": {
          "type": "CommerceFulfillment",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.orders.edges.node.lineItems.edges.node.artwork.image.cropped.src": (v12/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.image.cropped.srcSet": (v12/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon": (v14/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.id": (v8/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node.trackingId": (v9/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node.id": (v8/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped": (v15/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped.src": (v12/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped.srcSet": (v12/*: any*/)
      }
    },
    "name": "SettingsPurchases_Test_Query",
    "operationKind": "query",
    "text": "query SettingsPurchases_Test_Query {\n  me {\n    ...SettingsPurchases_me\n    id\n  }\n}\n\nfragment CommercePagination_pageCursors on CommercePageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SettingsPurchasesRow_order on CommerceOrder {\n  internalID\n  code\n  displayState\n  state\n  requestedFulfillment {\n    __typename\n  }\n  creditCard {\n    lastDigits\n    id\n  }\n  buyerTotal(precision: 2)\n  createdAt\n  currencyCode\n  lineItems {\n    edges {\n      node {\n        artwork {\n          href\n          image {\n            cropped(width: 45, height: 45) {\n              src\n              srcSet\n            }\n          }\n          partner {\n            href\n            initials\n            name\n            profile {\n              icon {\n                cropped(width: 45, height: 45) {\n                  src\n                  srcSet\n                }\n              }\n              id\n            }\n            id\n          }\n          shippingOrigin\n          title\n          artistNames\n          artists {\n            href\n            id\n          }\n          id\n        }\n        fulfillments(first: 1) {\n          edges {\n            node {\n              trackingId\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SettingsPurchases_me on Me {\n  name\n  orders(states: [APPROVED, CANCELED, FULFILLED, REFUNDED, SUBMITTED], first: 10) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...CommercePagination_pageCursors\n    }\n    edges {\n      node {\n        __typename\n        code\n        ...SettingsPurchasesRow_order\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7e82d547b04a31df6bc41f4aea8f71aa';
export default node;
