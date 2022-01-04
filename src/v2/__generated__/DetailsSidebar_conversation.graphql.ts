/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PENDING" | "PROCESSING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type DetailsSidebar_conversation = {
    readonly to: {
        readonly name: string;
        readonly initials: string | null;
    };
    readonly sidebarOrderConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly __typename: string;
                readonly internalID: string;
                readonly state: CommerceOrderStateEnum;
                readonly displayState: CommerceOrderDisplayStateEnum;
                readonly mode: CommerceOrderModeEnum | null;
                readonly stateReason: string | null;
                readonly stateExpiresAt: string | null;
                readonly requestedFulfillment: {
                    readonly __typename: string;
                    readonly " $fragmentRefs": FragmentRefs<"ShippingAddress_ship">;
                } | null;
                readonly creditCard: {
                    readonly brand: string;
                    readonly lastDigits: string;
                    readonly expirationYear: number;
                    readonly expirationMonth: number;
                } | null;
                readonly lineItems: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly shipment: {
                                readonly trackingNumber: string | null;
                                readonly trackingUrl: string | null;
                                readonly carrierName: string | null;
                                readonly estimatedDeliveryWindow: string | null;
                            } | null;
                            readonly selectedShippingQuote: {
                                readonly displayName: string;
                            } | null;
                            readonly fulfillments: {
                                readonly edges: ReadonlyArray<{
                                    readonly node: {
                                        readonly courier: string;
                                        readonly trackingId: string | null;
                                        readonly estimatedDelivery: string | null;
                                    } | null;
                                } | null> | null;
                            } | null;
                        } | null;
                    } | null> | null;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"TransactionDetailsSummaryItem_order" | "ShippingSummaryItem_order">;
            } | null;
        } | null> | null;
    } | null;
    readonly messagesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly attachments: ReadonlyArray<{
                    readonly id: string;
                    readonly contentType: string;
                    readonly fileName: string;
                    readonly downloadURL: string;
                } | null> | null;
            } | null;
        } | null> | null;
    } | null;
    readonly items: ReadonlyArray<{
        readonly item: ({
            readonly __typename: "Artwork";
            readonly href: string | null;
            readonly image: {
                readonly thumbnailUrl: string | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork">;
        } | {
            readonly __typename: "Show";
            readonly href: string | null;
            readonly image: {
                readonly thumbnailUrl: string | null;
            } | null;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }) | null;
    } | null> | null;
    readonly " $refType": "DetailsSidebar_conversation";
};
export type DetailsSidebar_conversation$data = DetailsSidebar_conversation;
export type DetailsSidebar_conversation$key = {
    readonly " $data"?: DetailsSidebar_conversation$data;
    readonly " $fragmentRefs": FragmentRefs<"DetailsSidebar_conversation">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = [
  {
    "alias": "thumbnailUrl",
    "args": [
      {
        "kind": "Literal",
        "name": "version",
        "value": "small"
      }
    ],
    "kind": "ScalarField",
    "name": "url",
    "storageKey": "url(version:\"small\")"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": 30,
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "messagesConnection"
        ]
      }
    ]
  },
  "name": "DetailsSidebar_conversation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ConversationResponder",
      "kind": "LinkedField",
      "name": "to",
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
          "name": "initials",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "sidebarOrderConnection",
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
            "FULFILLED",
            "SUBMITTED"
          ]
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "kind": "LinkedField",
      "name": "orderConnection",
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
                (v0/*: any*/),
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
                  "name": "state",
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
                  "name": "mode",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "stateReason",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "MMM D"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "stateExpiresAt",
                  "storageKey": "stateExpiresAt(format:\"MMM D\")"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "requestedFulfillment",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ShippingAddress_ship"
                    }
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
                      "name": "brand",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "lastDigits",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "expirationYear",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "expirationMonth",
                      "storageKey": null
                    }
                  ],
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
                              "concreteType": "CommerceShipment",
                              "kind": "LinkedField",
                              "name": "shipment",
                              "plural": false,
                              "selections": [
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "trackingNumber",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "trackingUrl",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "carrierName",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "estimatedDeliveryWindow",
                                  "storageKey": null
                                }
                              ],
                              "storageKey": null
                            },
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "CommerceShippingQuote",
                              "kind": "LinkedField",
                              "name": "selectedShippingQuote",
                              "plural": false,
                              "selections": [
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "displayName",
                                  "storageKey": null
                                }
                              ],
                              "storageKey": null
                            },
                            {
                              "alias": null,
                              "args": null,
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
                                          "name": "courier",
                                          "storageKey": null
                                        },
                                        {
                                          "alias": null,
                                          "args": null,
                                          "kind": "ScalarField",
                                          "name": "trackingId",
                                          "storageKey": null
                                        },
                                        {
                                          "alias": null,
                                          "args": [
                                            {
                                              "kind": "Literal",
                                              "name": "format",
                                              "value": "MMM Do, YYYY"
                                            }
                                          ],
                                          "kind": "ScalarField",
                                          "name": "estimatedDelivery",
                                          "storageKey": "estimatedDelivery(format:\"MMM Do, YYYY\")"
                                        }
                                      ],
                                      "storageKey": null
                                    }
                                  ],
                                  "storageKey": null
                                }
                              ],
                              "storageKey": null
                            }
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "TransactionDetailsSummaryItem_order"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShippingSummaryItem_order"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderConnection(first:10,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\"])"
    },
    {
      "alias": "messagesConnection",
      "args": null,
      "concreteType": "MessageConnection",
      "kind": "LinkedField",
      "name": "__Messages_messagesConnection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MessageEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Message",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Attachment",
                  "kind": "LinkedField",
                  "name": "attachments",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "contentType",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "fileName",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "downloadURL",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                (v0/*: any*/)
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
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
      "concreteType": "ConversationItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "item",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "image",
                  "plural": false,
                  "selections": (v2/*: any*/),
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Metadata_artwork"
                }
              ],
              "type": "Artwork"
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v1/*: any*/),
                {
                  "alias": "image",
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "coverImage",
                  "plural": false,
                  "selections": (v2/*: any*/),
                  "storageKey": null
                }
              ],
              "type": "Show"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Conversation"
};
})();
(node as any).hash = 'aa8ac3430c97b04b7ed24e1a8f5e75c4';
export default node;
