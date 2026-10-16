/**
 * @generated SignedSource<<aaf9bd241c183d69565b6f0cfee82f21>>
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
  includeDebugToolCalls?: boolean | null | undefined;
  message: string;
  supportedSections?: ReadonlyArray<AIAgentSectionType> | null | undefined;
};
export type AIAgentMessageInput = {
  artworkIDs?: ReadonlyArray<string> | null | undefined;
  content: string;
  displayedSections?: ReadonlyArray<AIAgentDisplayedSectionInput> | null | undefined;
  role: AIAgentRole;
};
export type AIAgentDisplayedSectionInput = {
  entityType: AIAgentEntityType;
  internalIDs: ReadonlyArray<string>;
};
export type useArtAssistantConversationSubscription$variables = {
  input: AIAgentTurnInput;
};
export type useArtAssistantConversationSubscription$data = {
  readonly aiAgentTurn: {
    readonly __typename: "AIAgentToolCall";
    readonly activity: AIAgentActivity;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stopReason",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "toolCallCount",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = [
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "artworks",
  "plural": true,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = {
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
v11 = [
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Artwork",
  "kind": "LinkedField",
  "name": "artworks",
  "plural": true,
  "selections": (v11/*: any*/),
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
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
                      (v9/*: any*/)
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
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "AIAgentArtistsSection",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              (v10/*: any*/)
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
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
                      (v12/*: any*/)
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
                        "selections": (v11/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "AIAgentArtistsSection",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v12/*: any*/),
              (v10/*: any*/)
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
    "cacheID": "51ec31435f6303184140e8e0464f403f",
    "id": null,
    "metadata": {},
    "name": "useArtAssistantConversationSubscription",
    "operationKind": "subscription",
    "text": "subscription useArtAssistantConversationSubscription(\n  $input: AIAgentTurnInput!\n) {\n  aiAgentTurn(input: $input) {\n    __typename\n    ... on AIAgentToolCall {\n      activity\n    }\n    ... on AIAgentTurnComplete {\n      message\n      stopReason\n      toolCallCount\n      sections {\n        __typename\n        ... on AIAgentArtworksSection {\n          artworks {\n            internalID\n            id\n          }\n        }\n        ... on AIAgentArtistsSection {\n          artists {\n            internalID\n            id\n          }\n        }\n      }\n      artworks {\n        internalID\n        id\n      }\n      suggestedReplies {\n        text\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9804328a5168930dca462b19a2b8c64b";

export default node;
