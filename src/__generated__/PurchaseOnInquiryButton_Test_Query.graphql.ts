/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PurchaseOnInquiryButton_Test_QueryVariables = {};
export type PurchaseOnInquiryButton_Test_QueryResponse = {
    readonly me: {
        readonly conversation: {
            readonly " $fragmentRefs": FragmentRefs<"PurchaseOnInquiryButton_conversation">;
        } | null;
    } | null;
};
export type PurchaseOnInquiryButton_Test_Query = {
    readonly response: PurchaseOnInquiryButton_Test_QueryResponse;
    readonly variables: PurchaseOnInquiryButton_Test_QueryVariables;
};



/*
query PurchaseOnInquiryButton_Test_Query {
  me {
    conversation(id: "123") {
      ...PurchaseOnInquiryButton_conversation
      id
    }
    id
  }
}

fragment ConfirmArtworkButton_artwork on Artwork {
  internalID
}

fragment PurchaseOnInquiryButton_conversation on Conversation {
  internalID
  items {
    liveArtwork {
      __typename
      ... on Artwork {
        __typename
        isEdition
        internalID
        slug
        editionSets {
          internalID
          id
        }
        ...ConfirmArtworkButton_artwork
      }
      ... on Node {
        __isNode: __typename
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PurchaseOnInquiryButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PurchaseOnInquiryButton_conversation"
              }
            ],
            "storageKey": "conversation(id:\"123\")"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PurchaseOnInquiryButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
                    "name": "liveArtwork",
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
                            "name": "isEdition",
                            "storageKey": null
                          },
                          (v1/*: any*/),
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
                            "concreteType": "EditionSet",
                            "kind": "LinkedField",
                            "name": "editionSets",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "conversation(id:\"123\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fd59dc7507907fea0ea30bf01ca040cb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "me.conversation.id": (v3/*: any*/),
        "me.conversation.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "me.conversation.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationItem"
        },
        "me.conversation.items.liveArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConversationItemType"
        },
        "me.conversation.items.liveArtwork.__isNode": (v4/*: any*/),
        "me.conversation.items.liveArtwork.__typename": (v4/*: any*/),
        "me.conversation.items.liveArtwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "me.conversation.items.liveArtwork.editionSets.id": (v3/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.internalID": (v3/*: any*/),
        "me.conversation.items.liveArtwork.id": (v3/*: any*/),
        "me.conversation.items.liveArtwork.internalID": (v3/*: any*/),
        "me.conversation.items.liveArtwork.isEdition": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.conversation.items.liveArtwork.slug": (v3/*: any*/),
        "me.id": (v3/*: any*/)
      }
    },
    "name": "PurchaseOnInquiryButton_Test_Query",
    "operationKind": "query",
    "text": "query PurchaseOnInquiryButton_Test_Query {\n  me {\n    conversation(id: \"123\") {\n      ...PurchaseOnInquiryButton_conversation\n      id\n    }\n    id\n  }\n}\n\nfragment ConfirmArtworkButton_artwork on Artwork {\n  internalID\n}\n\nfragment PurchaseOnInquiryButton_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isEdition\n        internalID\n        slug\n        editionSets {\n          internalID\n          id\n        }\n        ...ConfirmArtworkButton_artwork\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6aa62e3f37e0913e9e06397acd03afef';
export default node;
