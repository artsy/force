/**
 * @generated SignedSource<<b509d7775bcffc46b54f079701bd4aa9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationsSidebarItem_conversation$data = {
  readonly from: {
    readonly name: string;
  };
  readonly fromUser: {
    readonly collectorProfile: {
      readonly confirmedBuyerAt: string | null;
    } | null;
  } | null;
  readonly internalID: string | null;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly __typename: "Artwork";
      readonly artist: {
        readonly name: string;
      };
      readonly date: string | null;
      readonly id: string;
      readonly image: {
        readonly url: string;
      };
      readonly title: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null> | null;
  readonly lastMessageAt: string | null;
  readonly orderConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
      } | null;
    } | null> | null;
  } | null;
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sellerId"
    }
  ],
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
      "concreteType": "ConversationInitiator",
      "kind": "LinkedField",
      "name": "from",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "fromUser",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CollectorProfileType",
          "kind": "LinkedField",
          "name": "collectorProfile",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "confirmedBuyerAt",
              "storageKey": null
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
      "args": [
        {
          "kind": "Literal",
          "name": "last",
          "value": 1
        },
        {
          "kind": "Variable",
          "name": "sellerId",
          "variableName": "sellerId"
        },
        {
          "kind": "Literal",
          "name": "states",
          "value": [
            "APPROVED",
            "FULFILLED",
            "SUBMITTED",
            "PROCESSING_APPROVAL",
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
                (v1/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
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
              (v1/*: any*/),
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
                    "action": "NONE",
                    "path": "items.item.title"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "date",
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
                          "action": "NONE",
                          "path": "items.item.artist.name"
                        }
                      ],
                      "storageKey": null
                    },
                    "action": "NONE",
                    "path": "items.item.artist"
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
                          "action": "NONE",
                          "path": "items.item.image.url"
                        }
                      ],
                      "storageKey": null
                    },
                    "action": "NONE",
                    "path": "items.item.image"
                  }
                ],
                "type": "Artwork",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          "action": "NONE",
          "path": "items.item"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "58dbb033afcce1fe69e15cab69901fd7";

export default node;
