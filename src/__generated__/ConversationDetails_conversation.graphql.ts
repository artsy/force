/**
 * @generated SignedSource<<41373fc9414e873b74451b8a4fd4a3da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationDetails_conversation$data = {
  readonly fromUser: {
    readonly collectorProfile: {
      readonly " $fragmentSpreads": FragmentRefs<"ConversationCollectorProfileInformation_collectorProfileType">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"ConversationCollectorProfileHeader_user">;
  } | null;
  readonly orderConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
        readonly " $fragmentSpreads": FragmentRefs<"OrderInformation_order">;
      } | null;
    } | null>;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationArtwork_conversation" | "ConversationHelpCenter_conversation" | "ConversationManageThisInquiry_conversation">;
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "fromUser",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ConversationCollectorProfileHeader_user"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CollectorProfileType",
          "kind": "LinkedField",
          "name": "collectorProfile",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ConversationCollectorProfileInformation_collectorProfileType"
            }
          ],
          "storageKey": null
        }
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
      "name": "ConversationManageThisInquiry_conversation"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationHelpCenter_conversation"
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "efdb8c756b4079ca40517331c13f46ef";

export default node;
