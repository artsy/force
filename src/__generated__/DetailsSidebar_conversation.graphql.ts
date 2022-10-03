/**
 * @generated SignedSource<<e1d3b86edb5cf11abbb8078dd28a7a14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceBuyerOfferActionEnum = "OFFER_ACCEPTED" | "OFFER_ACCEPTED_CONFIRM_NEEDED" | "OFFER_RECEIVED" | "OFFER_RECEIVED_CONFIRM_NEEDED" | "PAYMENT_FAILED" | "PROVISIONAL_OFFER_ACCEPTED" | "%future added value";
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PENDING" | "PROCESSING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DetailsSidebar_conversation$data = {
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
        readonly code: string;
        readonly stateExpiresAt: string | null;
        readonly creditCard: {
          readonly brand: string;
          readonly lastDigits: string;
          readonly expirationYear: number;
          readonly expirationMonth: number;
        } | null;
        readonly requestedFulfillment: {
          readonly __typename: string;
        } | null;
        readonly lineItems: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly artwork: {
                readonly shippingOrigin: string | null;
              } | null;
              readonly shipment: {
                readonly trackingNumber: string | null;
                readonly trackingUrl: string | null;
                readonly carrierName: string | null;
                readonly estimatedDeliveryWindow: string | null;
              } | null;
              readonly selectedShippingQuote: {
                readonly typeName: string;
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
        readonly buyerAction?: CommerceBuyerOfferActionEnum | null;
        readonly " $fragmentSpreads": FragmentRefs<"TransactionDetailsSummaryItem_order" | "ShippingSummaryItem_order" | "PaymentMethodSummaryItem_order">;
      } | null;
    } | null> | null;
  } | null;
  readonly attachmentsConnection: {
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
    readonly item: {
      readonly __typename: "Artwork";
      readonly href: string | null;
      readonly image: {
        readonly thumbnailUrl: string | null;
      } | null;
      readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
    } | {
      readonly __typename: "Show";
      readonly href: string | null;
      readonly image: {
        readonly thumbnailUrl: string | null;
      } | null;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null> | null;
  readonly " $fragmentType": "DetailsSidebar_conversation";
};
export type DetailsSidebar_conversation$key = {
  readonly " $data"?: DetailsSidebar_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"DetailsSidebar_conversation">;
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
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 30,
      "kind": "LocalArgument",
      "name": "count"
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
          "attachmentsConnection"
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
            "SUBMITTED",
            "PROCESSING_APPROVAL"
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
                  "args": null,
                  "kind": "ScalarField",
                  "name": "code",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "TransactionDetailsSummaryItem_order"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShippingSummaryItem_order"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PaymentMethodSummaryItem_order"
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
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "requestedFulfillment",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "buyerAction",
                      "storageKey": null
                    }
                  ],
                  "type": "CommerceOfferOrder",
                  "abstractKey": null
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
                                  "name": "shippingOrigin",
                                  "storageKey": null
                                }
                              ],
                              "storageKey": null
                            },
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
                                  "name": "typeName",
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderConnection(first:10,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"PROCESSING_APPROVAL\"])"
    },
    {
      "alias": "attachmentsConnection",
      "args": null,
      "concreteType": "MessageConnection",
      "kind": "LinkedField",
      "name": "__Details_attachmentsConnection_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Metadata_artwork"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "image",
                  "plural": false,
                  "selections": (v2/*: any*/),
                  "storageKey": null
                }
              ],
              "type": "Artwork",
              "abstractKey": null
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
              "type": "Show",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "5a4a706de0f0d02601ddf5f8ccf1ce3c";

export default node;
