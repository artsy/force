/**
 * @generated SignedSource<<40142d070d1f57d2efee67b2d2727643>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationDetails_conversation$data = {
  readonly internalID: string | null | undefined;
  readonly orderConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
        readonly " $fragmentSpreads": FragmentRefs<"ConversationOrderInformation_order">;
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
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
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
                    "name": "ConversationOrderInformation_order"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          "action": "NONE"
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

(node as any).hash = "6ad99c6f6229e4e45649b9c6787b42c6";

export default node;
