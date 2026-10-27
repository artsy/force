/**
 * @generated SignedSource<<289c512e8f9926ad4717ccc39fe033a9>>
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
  includeDebug: boolean;
  includeToolMetadata: boolean;
  input: AIAgentTurnInput;
};
export type useArtAssistantConversationSubscription$data = {
  readonly aiAgentTurn: {
    readonly __typename: "AIAgentToolCall";
    readonly activity: AIAgentActivity;
    readonly debugSummary?: string | null | undefined;
    readonly summary?: string | null | undefined;
    readonly toolName?: string;
  } | {
    readonly __typename: "AIAgentToolResult";
    readonly debugSummary?: string | null | undefined;
    readonly ok: boolean;
    readonly summary?: string | null | undefined;
    readonly toolName?: string;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeDebug"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeToolMetadata"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v3 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "condition": "includeToolMetadata",
  "kind": "Condition",
  "passingValue": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "toolName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    }
  ]
},
v6 = {
  "condition": "includeDebug",
  "kind": "Condition",
  "passingValue": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "debugSummary",
      "storageKey": null
    }
  ]
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "activity",
      "storageKey": null
    },
    (v5/*: any*/),
    (v6/*: any*/)
  ],
  "type": "AIAgentToolCall",
  "abstractKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ok",
      "storageKey": null
    },
    (v5/*: any*/),
    (v6/*: any*/)
  ],
  "type": "AIAgentToolResult",
  "abstractKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stopReason",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "toolCallCount",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v13 = [
  (v12/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "artworks",
  "plural": true,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
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
v16 = [
  (v12/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "artworks",
  "plural": true,
  "selections": (v16/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useArtAssistantConversationSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "aiAgentTurn",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "sections",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v14/*: any*/)
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
                        "selections": (v13/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "AIAgentArtistsSection",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v14/*: any*/),
              (v15/*: any*/)
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "useArtAssistantConversationSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "aiAgentTurn",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "sections",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v17/*: any*/)
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
                        "selections": (v16/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "AIAgentArtistsSection",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v17/*: any*/),
              (v15/*: any*/)
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
    "cacheID": "08c90309bceadb98649fb11ffb645fdb",
    "id": null,
    "metadata": {},
    "name": "useArtAssistantConversationSubscription",
    "operationKind": "subscription",
    "text": "subscription useArtAssistantConversationSubscription(\n  $input: AIAgentTurnInput!\n  $includeDebug: Boolean!\n  $includeToolMetadata: Boolean!\n) {\n  aiAgentTurn(input: $input) {\n    __typename\n    ... on AIAgentToolCall {\n      activity\n      toolName @include(if: $includeToolMetadata)\n      summary @include(if: $includeToolMetadata)\n      debugSummary @include(if: $includeDebug)\n    }\n    ... on AIAgentToolResult {\n      ok\n      toolName @include(if: $includeToolMetadata)\n      summary @include(if: $includeToolMetadata)\n      debugSummary @include(if: $includeDebug)\n    }\n    ... on AIAgentTurnComplete {\n      message\n      stopReason\n      toolCallCount\n      sections {\n        __typename\n        ... on AIAgentArtworksSection {\n          artworks {\n            internalID\n            id\n          }\n        }\n        ... on AIAgentArtistsSection {\n          artists {\n            internalID\n            id\n          }\n        }\n      }\n      artworks {\n        internalID\n        id\n      }\n      suggestedReplies {\n        text\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "492114f7071776e0d4674c8579a02fc4";

export default node;
