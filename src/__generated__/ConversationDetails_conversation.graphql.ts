/**
 * @generated SignedSource<<8fe020f18ccaa5ae09cc100bd5c0aa03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationDetails_conversation$data = {
  readonly orderConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
        readonly " $fragmentSpreads": FragmentRefs<"OrderInformation_order">;
      } | null | undefined;
    } | null | undefined>;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationArtwork_conversation" | "ConversationAttachments_conversation">;
  readonly " $fragmentType": "ConversationDetails_conversation";
};
export type ConversationDetails_conversation$key = {
  readonly " $data"?: ConversationDetails_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationDetails_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationDetails_conversation",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "states",
          "value": [
            "APPROVED",
            "FULFILLED",
            "SUBMITTED",
            "PROCESSING_APPROVAL",
            "REFUNDED",
            "CANCELED"
          ]
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "kind": "LinkedField",
      "name": "orderConnection",
      "plural": false,
      "selections": [
        {
          "kind": "RequiredField",
          "field": {
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "OrderInformation_order"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          "action": "NONE",
          "path": "orderConnection.edges"
        }
      ],
      "storageKey": "orderConnection(first:1,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"PROCESSING_APPROVAL\",\"REFUNDED\",\"CANCELED\"])"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationArtwork_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationAttachments_conversation"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "bbcd8f522409585052a7208b03c3e13c";

export default node;
