/**
 * @generated SignedSource<<eb08f5f23937bcd73256c0b0a4a1bb36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceBuyerOfferActionEnum = "OFFER_ACCEPTED" | "OFFER_ACCEPTED_CONFIRM_NEEDED" | "OFFER_RECEIVED" | "OFFER_RECEIVED_CONFIRM_NEEDED" | "PAYMENT_FAILED" | "PROVISIONAL_OFFER_ACCEPTED" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationCTA_conversation$data = {
  readonly activeOrderCTA: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly buyerAction?: CommerceBuyerOfferActionEnum | null | undefined;
        readonly internalID: string;
        readonly offers?: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly internalID: string;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        } | null | undefined;
        readonly state: CommerceOrderStateEnum;
        readonly stateExpiresAt: string | null | undefined;
        readonly stateReason: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly internalID: string | null | undefined;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly internalID: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly liveArtwork: {
      readonly __typename: "Artwork";
      readonly internalID: string;
      readonly isAcquireable: boolean | null | undefined;
      readonly isOfferable: boolean | null | undefined;
      readonly isOfferableFromInquiry: boolean | null | undefined;
      readonly published: boolean;
      readonly " $fragmentSpreads": FragmentRefs<"ConversationConfirmModal_artwork">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationReviewOfferCTA_conversation" | "useConversationPurchaseButtonData_conversation">;
  readonly " $fragmentType": "ConversationCTA_conversation";
};
export type ConversationCTA_conversation$key = {
  readonly " $data"?: ConversationCTA_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationCTA_conversation">;
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
  "name": "__typename",
  "storageKey": null
},
v2 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationCTA_conversation",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useConversationPurchaseButtonData_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationReviewOfferCTA_conversation"
    },
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
          "name": "liveArtwork",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ConversationConfirmModal_artwork"
                },
                (v1/*: any*/),
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isOfferableFromInquiry",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isAcquireable",
                  "storageKey": null
                },
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
                  "name": "published",
                  "storageKey": null
                }
              ],
              "type": "Artwork",
              "abstractKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "item",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v2/*: any*/),
              "type": "Artwork",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "activeOrderCTA",
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
            "PROCESSING_APPROVAL",
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
                              "selections": (v2/*: any*/),
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": "offers(first:5)"
                    }
                  ],
                  "type": "CommerceOfferOrder",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderConnection(first:10,states:[\"APPROVED\",\"PROCESSING_APPROVAL\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\"])"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "d6908cebbd5ab73c78ee55b3b08e836b";

export default node;
