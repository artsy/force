/**
 * @generated SignedSource<<dd18bebf7af81c8eadf2a9de07a6b51c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationCollectorProfileInformationTestQuery$variables = {};
export type ConversationCollectorProfileInformationTestQuery$data = {
  readonly conversation: {
    readonly fromUser: {
      readonly collectorProfile: {
        readonly " $fragmentSpreads": FragmentRefs<"ConversationCollectorProfileInformation_collectorProfileType">;
      } | null;
    } | null;
  } | null;
};
export type ConversationCollectorProfileInformationTestQuery = {
  response: ConversationCollectorProfileInformationTestQuery$data;
  variables: ConversationCollectorProfileInformationTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "conversation-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationCollectorProfileInformationTestQuery",
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ConversationCollectorProfileInformation_collectorProfileType"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "conversation(id:\"conversation-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConversationCollectorProfileInformationTestQuery",
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
                    "name": "profession",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MyLocation",
                    "kind": "LinkedField",
                    "name": "location",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "country",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isActiveInquirer",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isActiveBidder",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "confirmedBuyerAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "otherRelevantPositions",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bio",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CollectorProfileArtists",
                    "kind": "LinkedField",
                    "name": "collectorProfileArtists",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "conversation(id:\"conversation-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "628ad8df59b61c92dd4690caec100ebb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "conversation.fromUser": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "conversation.fromUser.collectorProfile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorProfileType"
        },
        "conversation.fromUser.collectorProfile.bio": (v2/*: any*/),
        "conversation.fromUser.collectorProfile.collectorProfileArtists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CollectorProfileArtists"
        },
        "conversation.fromUser.collectorProfile.collectorProfileArtists.name": (v2/*: any*/),
        "conversation.fromUser.collectorProfile.confirmedBuyerAt": (v2/*: any*/),
        "conversation.fromUser.collectorProfile.id": (v3/*: any*/),
        "conversation.fromUser.collectorProfile.isActiveBidder": (v4/*: any*/),
        "conversation.fromUser.collectorProfile.isActiveInquirer": (v4/*: any*/),
        "conversation.fromUser.collectorProfile.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyLocation"
        },
        "conversation.fromUser.collectorProfile.location.city": (v2/*: any*/),
        "conversation.fromUser.collectorProfile.location.country": (v2/*: any*/),
        "conversation.fromUser.collectorProfile.location.id": (v3/*: any*/),
        "conversation.fromUser.collectorProfile.otherRelevantPositions": (v2/*: any*/),
        "conversation.fromUser.collectorProfile.profession": (v2/*: any*/),
        "conversation.fromUser.id": (v3/*: any*/),
        "conversation.id": (v3/*: any*/)
      }
    },
    "name": "ConversationCollectorProfileInformationTestQuery",
    "operationKind": "query",
    "text": "query ConversationCollectorProfileInformationTestQuery {\n  conversation(id: \"conversation-id\") {\n    fromUser {\n      collectorProfile {\n        ...ConversationCollectorProfileInformation_collectorProfileType\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ConversationCollectorProfileInformation_collectorProfileType on CollectorProfileType {\n  profession\n  location {\n    city\n    country\n    id\n  }\n  isActiveInquirer\n  isActiveBidder\n  confirmedBuyerAt\n  otherRelevantPositions\n  bio\n  collectorProfileArtists {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "84f9b3badabfe38f0036d3ea08c792f5";

export default node;
