/**
 * @generated SignedSource<<478840e800956f733786ca06c82ec6d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceBuyerOfferActionEnum = "OFFER_ACCEPTED" | "OFFER_ACCEPTED_CONFIRM_NEEDED" | "OFFER_RECEIVED" | "OFFER_RECEIVED_CONFIRM_NEEDED" | "PAYMENT_FAILED" | "PROVISIONAL_OFFER_ACCEPTED" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_conversation$data = {
  readonly fromLastViewedMessageID: string | null | undefined;
  readonly inquiryRequest: {
    readonly formattedFirstMessage: string | null | undefined;
  } | null | undefined;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: string;
      readonly id?: string;
      readonly internalID?: string;
      readonly isOfferable?: boolean | null | undefined;
      readonly isOfferableFromInquiry?: boolean | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"ConversationMessageArtwork_item">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly messagesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly createdAt: string | null | undefined;
        readonly id: string;
        readonly internalID: string;
        readonly isFromUser: boolean | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"ConversationMessage_message">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null | undefined;
    };
    readonly totalCount: number | null | undefined;
  };
  readonly orderEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly buyerAction?: CommerceBuyerOfferActionEnum | null | undefined;
        readonly internalID: string;
        readonly orderHistory: ReadonlyArray<{
          readonly __typename: string;
          readonly createdAt?: string;
          readonly offer?: {
            readonly amount: string | null | undefined;
            readonly definesTotal: boolean;
            readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
            readonly offerAmountChanged: boolean;
            readonly respondsTo: {
              readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
            } | null | undefined;
          };
          readonly orderUpdateState?: string | null | undefined;
          readonly state?: CommerceOrderStateEnum;
          readonly stateReason?: string | null | undefined;
          readonly " $fragmentSpreads": FragmentRefs<"ConversationOrderUpdate_event">;
        }>;
        readonly updatedAt: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "ConversationMessages_conversation";
} | null | undefined;
export type ConversationMessages_conversation$key = {
  readonly " $data"?: ConversationMessages_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 15,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "messagesConnection"
        ]
      }
    ]
  },
  "name": "ConversationMessages_conversation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fromLastViewedMessageID",
      "storageKey": null
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": "messagesConnection",
        "args": [
          {
            "kind": "Literal",
            "name": "sort",
            "value": "DESC"
          }
        ],
        "concreteType": "MessageConnection",
        "kind": "LinkedField",
        "name": "__ConversationMessages_conversation_messagesConnection_connection",
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
            "concreteType": "PageInfo",
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
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isFromUser",
                    "storageKey": null
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ConversationMessage_message"
                  },
                  (v3/*: any*/)
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
          }
        ],
        "storageKey": "__ConversationMessages_conversation_messagesConnection_connection(sort:\"DESC\")"
      },
      "action": "NONE",
      "path": "messagesConnection"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerInquiryRequest",
      "kind": "LinkedField",
      "name": "inquiryRequest",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formattedFirstMessage",
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
            (v3/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isOfferable",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isOfferableFromInquiry",
                  "storageKey": null
                },
                (v1/*: any*/)
              ],
              "type": "Artwork",
              "abstractKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ConversationMessageArtwork_item"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": "orderEvents",
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 10
          },
          {
            "kind": "Literal",
            "name": "participantType",
            "value": "BUYER"
          },
          {
            "kind": "Literal",
            "name": "states",
            "value": [
              "APPROVED",
              "FULFILLED",
              "SUBMITTED",
              "REFUNDED",
              "CANCELED",
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
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "updatedAt",
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "orderHistory",
                    "plural": true,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "ConversationOrderUpdate_event"
                      },
                      (v3/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "orderUpdateState",
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
                            "name": "stateReason",
                            "storageKey": null
                          }
                        ],
                        "type": "CommerceOrderStateChangedEvent",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceOffer",
                            "kind": "LinkedField",
                            "name": "offer",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "amount",
                                "storageKey": null
                              },
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "definesTotal",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "offerAmountChanged",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceOffer",
                                "kind": "LinkedField",
                                "name": "respondsTo",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "CommerceOfferSubmittedEvent",
                        "abstractKey": null
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
        "storageKey": "orderConnection(first:10,participantType:\"BUYER\",states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\",\"CANCELED\",\"PROCESSING_APPROVAL\"])"
      },
      "action": "NONE",
      "path": "orderEvents"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "f44cc776a018d8db27dafb1680269a18";

export default node;
