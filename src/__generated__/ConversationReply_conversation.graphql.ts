/**
 * @generated SignedSource<<43a3221aa2156d9f0bf65a39a7a05eb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationReply_conversation$data = {
  readonly from: {
    readonly email: string;
    readonly id: string;
  };
  readonly inquiryID: string;
  readonly internalID: string;
  readonly lastMessageID: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationCTA_conversation" | "ConversationPartnerOfferCTA_conversation">;
  readonly " $fragmentType": "ConversationReply_conversation";
} | null | undefined;
export type ConversationReply_conversation$key = {
  readonly " $data"?: ConversationReply_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationReply_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationReply_conversation",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationCTA_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationPartnerOfferCTA_conversation"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "ConversationInitiator",
        "kind": "LinkedField",
        "name": "from",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "email",
              "storageKey": null
            },
            "action": "NONE"
          },
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            "action": "NONE"
          }
        ],
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "internalID",
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "inquiryID",
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastMessageID",
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "8627e23744dbc8e70bba18698758ca48";

export default node;
