/**
 * @generated SignedSource<<98507584acfd1fd9337b61235e1c199b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationSnippet_conversation$data = {
  readonly internalID: string | null | undefined;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly artistNames: string | null | undefined;
      readonly date: string | null | undefined;
      readonly image: {
        readonly url: string | null | undefined;
      } | null | undefined;
      readonly title: string | null | undefined;
    } | {
      readonly __typename: "Show";
      readonly coverImage: {
        readonly url: string | null | undefined;
      } | null | undefined;
      readonly fair: {
        readonly name: string | null | undefined;
      } | null | undefined;
      readonly name: string | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly lastMessage: string | null | undefined;
  readonly lastMessageAt: string | null | undefined;
  readonly to: {
    readonly name: string;
  };
  readonly unread: boolean | null | undefined;
  readonly " $fragmentType": "ConversationSnippet_conversation";
};
export type ConversationSnippet_conversation$key = {
  readonly " $data"?: ConversationSnippet_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationSnippet_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationSnippet_conversation",
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
      "concreteType": "ConversationResponder",
      "kind": "LinkedField",
      "name": "to",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
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
      "name": "lastMessageAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unread",
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
                  "kind": "ScalarField",
                  "name": "artistNames",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "image",
                  "plural": false,
                  "selections": (v2/*: any*/),
                  "storageKey": null
                }
              ],
              "type": "Artwork",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Fair",
                  "kind": "LinkedField",
                  "name": "fair",
                  "plural": false,
                  "selections": (v1/*: any*/),
                  "storageKey": null
                },
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "coverImage",
                  "plural": false,
                  "selections": (v2/*: any*/),
                  "storageKey": null
                }
              ],
              "type": "Show",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "51a731d89429f7b46a9000aed66aec62";

export default node;
