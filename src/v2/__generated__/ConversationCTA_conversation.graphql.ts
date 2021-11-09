/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceBuyerOfferActionEnum = "OFFER_ACCEPTED" | "OFFER_ACCEPTED_CONFIRM_NEEDED" | "OFFER_RECEIVED" | "OFFER_RECEIVED_CONFIRM_NEEDED" | "PAYMENT_FAILED" | "PROVISIONAL_OFFER_ACCEPTED" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type ConversationCTA_conversation = {
    readonly internalID: string | null;
    readonly items: ReadonlyArray<{
        readonly item: ({
            readonly __typename: "Artwork";
            readonly internalID: string;
            readonly isOfferableFromInquiry: boolean | null;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }) | null;
    } | null> | null;
    readonly activeOrders: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly state: CommerceOrderStateEnum;
                readonly stateReason: string | null;
                readonly stateExpiresAt: string | null;
                readonly buyerAction?: CommerceBuyerOfferActionEnum | null;
                readonly offers?: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly internalID: string;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"OpenInquiryModalCTA_conversation">;
    readonly " $refType": "ConversationCTA_conversation";
};
export type ConversationCTA_conversation$data = ConversationCTA_conversation;
export type ConversationCTA_conversation$key = {
    readonly " $data"?: ConversationCTA_conversation$data;
    readonly " $fragmentRefs": FragmentRefs<"ConversationCTA_conversation">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationCTA_conversation",
  "selections": [
    (v0/*: any*/),
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isOfferableFromInquiry",
                  "storageKey": null
                }
              ],
              "type": "Artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "activeOrders",
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
            "REFUNDED"
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
                  "name": "state",
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
                  "name": "stateExpiresAt",
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
                    },
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "first",
                          "value": 5
                        }
                      ],
                      "concreteType": "CommerceOfferConnection",
                      "kind": "LinkedField",
                      "name": "offers",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "CommerceOfferEdge",
                          "kind": "LinkedField",
                          "name": "edges",
                          "plural": true,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "CommerceOffer",
                              "kind": "LinkedField",
                              "name": "node",
                              "plural": false,
                              "selections": [
                                (v0/*: any*/)
                              ],
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": "offers(first:5)"
                    }
                  ],
                  "type": "CommerceOfferOrder"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderConnection(first:10,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\"])"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OpenInquiryModalCTA_conversation"
    }
  ],
  "type": "Conversation"
};
})();
(node as any).hash = '8b8c2570209c5ae462bf0da9532bb376';
export default node;
