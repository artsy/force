/**
 * @generated SignedSource<<d987d2ee5a3e4123728b7e7c5750ffa8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationHeader_conversation$data = {
  readonly from: {
    readonly name: string;
  };
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly artist: {
        readonly name: string | null;
      } | null;
      readonly date: string | null;
      readonly id: string;
      readonly image: {
        readonly url: string | null;
      } | null;
      readonly slug: string;
      readonly title: string | null;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null> | null;
  readonly orderConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly state: CommerceOrderStateEnum;
      } | null;
    } | null>;
  } | null;
  readonly to: {
    readonly name: string;
  };
  readonly " $fragmentType": "ConversationHeader_conversation";
};
export type ConversationHeader_conversation$key = {
  readonly " $data"?: ConversationHeader_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationHeader_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationHeader_conversation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ConversationInitiator",
      "kind": "LinkedField",
      "name": "from",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ConversationResponder",
      "kind": "LinkedField",
      "name": "to",
      "plural": false,
      "selections": (v0/*: any*/),
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
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "date",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artist",
                  "kind": "LinkedField",
                  "name": "artist",
                  "plural": false,
                  "selections": (v0/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "image",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
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
                    "kind": "RequiredField",
                    "field": {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "state",
                      "storageKey": null
                    },
                    "action": "NONE",
                    "path": "orderConnection.edges.node.state"
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
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "a2384077464ebb8089305b517f8ea9b7";

export default node;
