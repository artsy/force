/**
 * @generated SignedSource<<a00872b4fadf92c828f3a275012f12e4>>
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
  readonly inquiryRequest: {
    readonly formattedFirstMessage: string | null;
  } | null;
  readonly messagesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly createdAt: string | null;
        readonly id: string;
        readonly internalID: string;
        readonly isFromUser: boolean | null;
        readonly " $fragmentSpreads": FragmentRefs<"ConversationMessage_message">;
      } | null;
    } | null> | null;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null;
    };
  };
  readonly orderEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly buyerAction?: CommerceBuyerOfferActionEnum | null;
        readonly internalID: string;
        readonly orderHistory: ReadonlyArray<{
          readonly __typename: "CommerceOfferSubmittedEvent";
          readonly createdAt: string;
          readonly offer: {
            readonly amount: string | null;
            readonly definesTotal: boolean;
            readonly fromParticipant: CommerceOrderParticipantEnum | null;
            readonly offerAmountChanged: boolean;
            readonly respondsTo: {
              readonly fromParticipant: CommerceOrderParticipantEnum | null;
            } | null;
          };
        } | {
          readonly __typename: "CommerceOrderStateChangedEvent";
          readonly createdAt: string;
          readonly orderUpdateState: string | null;
          readonly state: CommerceOrderStateEnum;
          readonly stateReason: string | null;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        }>;
        readonly updatedAt: string;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "ConversationMessages_conversation";
} | null;
export type ConversationMessages_conversation$key = {
  readonly " $data"?: ConversationMessages_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
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
      "defaultValue": 10,
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  (v0/*: any*/),
                  (v1/*: any*/),
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
                  (v2/*: any*/)
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
                (v0/*: any*/),
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
                    (v2/*: any*/),
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        (v1/*: any*/),
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
                        (v1/*: any*/),
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
                            (v3/*: any*/),
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
                                (v3/*: any*/)
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
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "d2b1ef00803f0c93f70ead19bc554267";

export default node;
