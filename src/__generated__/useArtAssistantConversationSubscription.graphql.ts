/**
 * @generated SignedSource<<bc61f03962cab9259605942a3f143790>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AIAgentActivity = "FINDING_RECOMMENDATIONS" | "LOADING_ARTWORK_DETAILS" | "SEARCHING_ARTISTS" | "SEARCHING_ARTSY" | "SEARCHING_ARTWORKS" | "SEARCHING_FAIRS" | "SEARCHING_SHOWS" | "THINKING" | "%future added value";
export type AIAgentEntityType = "ARTIST" | "ARTWORK" | "%future added value";
export type AIAgentRole = "ASSISTANT" | "USER" | "%future added value";
export type AIAgentSectionType = "ARTISTS" | "ARTWORKS" | "%future added value";
export type AIAgentTurnInput = {
  conversationID: string;
  history?: ReadonlyArray<AIAgentMessageInput> | null | undefined;
  image?: AIAgentImageInput | null | undefined;
  includeDebugToolCalls?: boolean | null | undefined;
  message: string;
  supportedSections?: ReadonlyArray<AIAgentSectionType> | null | undefined;
};
export type AIAgentMessageInput = {
  artworkIDs?: ReadonlyArray<string> | null | undefined;
  content: string;
  displayedSections?: ReadonlyArray<AIAgentDisplayedSectionInput> | null | undefined;
  image?: AIAgentImageInput | null | undefined;
  role: AIAgentRole;
};
export type AIAgentDisplayedSectionInput = {
  entityType: AIAgentEntityType;
  internalIDs: ReadonlyArray<string>;
};
export type AIAgentImageInput = {
  s3Bucket: string;
  s3Key: string;
};
export type useArtAssistantConversationSubscription$variables = {
  input: AIAgentTurnInput;
};
export type useArtAssistantConversationSubscription$data = {
  readonly aiAgentTurn: {
    readonly __typename: "AIAgentToolCall";
    readonly activity: AIAgentActivity;
  } | {
    readonly __typename: "AIAgentToolResult";
    readonly ok: boolean;
  } | {
    readonly __typename: "AIAgentTurnComplete";
    readonly artworks: ReadonlyArray<{
      readonly internalID: string;
    }> | null | undefined;
    readonly message: string | null | undefined;
    readonly sections: ReadonlyArray<{
      readonly __typename: "AIAgentArtistsSection";
      readonly artists: ReadonlyArray<{
        readonly internalID: string;
      }>;
    } | {
      readonly __typename: "AIAgentArtworksSection";
      readonly artworks: ReadonlyArray<{
        readonly internalID: string;
      }>;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null | undefined;
    readonly stopReason: string;
    readonly suggestedReplies: ReadonlyArray<{
      readonly text: string;
    }> | null | undefined;
    readonly toolCallCount: number;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
};
export type useArtAssistantConversationSubscription = {
  response: useArtAssistantConversationSubscription$data;
  variables: useArtAssistantConversationSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "activity",
      "storageKey": null
    }
  ],
  "type": "AIAgentToolCall",
  "abstractKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ok",
      "storageKey": null
    }
  ],
  "type": "AIAgentToolResult",
  "abstractKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stopReason",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "toolCallCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "artworks",
  "plural": true,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "AIAgentSuggestedReply",
  "kind": "LinkedField",
  "name": "suggestedReplies",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = [
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "artworks",
  "plural": true,
  "selections": (v12/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useArtAssistantConversationSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "aiAgentTurn",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "sections",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v10/*: any*/)
                    ],
                    "type": "AIAgentArtworksSection",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": (v9/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "AIAgentArtistsSection",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "type": "AIAgentTurnComplete",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useArtAssistantConversationSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "aiAgentTurn",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "sections",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v13/*: any*/)
                    ],
                    "type": "AIAgentArtworksSection",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "AIAgentArtistsSection",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v13/*: any*/),
              (v11/*: any*/)
            ],
            "type": "AIAgentTurnComplete",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d2825ed5a47bfc2318e5fe48748b889a",
    "id": null,
    "metadata": {},
    "name": "useArtAssistantConversationSubscription",
    "operationKind": "subscription",
    "text": "subscription useArtAssistantConversationSubscription(\n  $input: AIAgentTurnInput!\n) {\n  aiAgentTurn(input: $input) {\n    __typename\n    ... on AIAgentToolCall {\n      activity\n    }\n    ... on AIAgentToolResult {\n      ok\n    }\n    ... on AIAgentTurnComplete {\n      message\n      stopReason\n      toolCallCount\n      sections {\n        __typename\n        ... on AIAgentArtworksSection {\n          artworks {\n            internalID\n            id\n          }\n        }\n        ... on AIAgentArtistsSection {\n          artists {\n            internalID\n            id\n          }\n        }\n      }\n      artworks {\n        internalID\n        id\n      }\n      suggestedReplies {\n        text\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5b6c515db0ce4d536073febc9202af13";

export default node;
