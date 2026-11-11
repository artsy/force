/**
 * @generated SignedSource<<3768a5910e439d649a2ce3317798f894>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationsSidebarItem_conversation$data = {
  readonly internalID: string | null | undefined;
  readonly isLastMessageToUser: boolean | null | undefined;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly artist: {
        readonly name: string;
      };
      readonly date: string | null | undefined;
      readonly id: string;
      readonly image: {
        readonly url: string;
      };
      readonly isUnlisted: boolean;
      readonly title: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined> | null | undefined;
  readonly lastMessage: string | null | undefined;
  readonly lastMessageAt: string | null | undefined;
  readonly to: {
    readonly name: string;
  };
  readonly unreadByCollector: boolean | null | undefined;
  readonly " $fragmentType": "ConversationsSidebarItem_conversation";
};
export type ConversationsSidebarItem_conversation$key = {
  readonly " $data"?: ConversationsSidebarItem_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationsSidebarItem_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationsSidebarItem_conversation",
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
      "args": null,
      "kind": "ScalarField",
      "name": "unreadByCollector",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ConversationResponder",
      "kind": "LinkedField",
      "name": "to",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
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
      "name": "lastMessageAt",
      "storageKey": "lastMessageAt(format:\"MMM D\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastMessage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLastMessageToUser",
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
          "kind": "RequiredField",
          "field": {
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
                    "kind": "RequiredField",
                    "field": {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "title",
                      "storageKey": null
                    },
                    "action": "NONE"
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
                    "name": "isUnlisted",
                    "storageKey": null
                  },
                  {
                    "kind": "RequiredField",
                    "field": {
                      "alias": null,
                      "args": null,
                      "concreteType": "Artist",
                      "kind": "LinkedField",
                      "name": "artist",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "RequiredField",
                          "field": (v0/*: any*/),
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
                      "concreteType": "Image",
                      "kind": "LinkedField",
                      "name": "image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "RequiredField",
                          "field": {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "small",
                                  "square"
                                ]
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:[\"small\",\"square\"])"
                          },
                          "action": "NONE"
                        }
                      ],
                      "storageKey": null
                    },
                    "action": "NONE"
                  }
                ],
                "type": "Artwork",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          "action": "NONE"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "3fec48cf10df3bbe40016144849bedf2";

export default node;
