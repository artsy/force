/**
 * @generated SignedSource<<d3756fc9c89d03f8a3afd6a1c6351850>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationCollectorProfileHeaderTestQuery$variables = {};
export type ConversationCollectorProfileHeaderTestQuery$data = {
  readonly conversation: {
    readonly fromUser: {
      readonly " $fragmentSpreads": FragmentRefs<"ConversationCollectorProfileHeader_user">;
    } | null;
  } | null;
};
export type ConversationCollectorProfileHeaderTestQuery = {
  response: ConversationCollectorProfileHeaderTestQuery$data;
  variables: ConversationCollectorProfileHeaderTestQuery$variables;
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
    "name": "ConversationCollectorProfileHeaderTestQuery",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "ConversationCollectorProfileHeader_user"
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
    "name": "ConversationCollectorProfileHeaderTestQuery",
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
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "YYYY"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "artsyUserSince",
                    "storageKey": "artsyUserSince(format:\"YYYY\")"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isIdentityVerified",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isEmailConfirmed",
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
    "cacheID": "5f34403d5a2ea3b9dafeb25c517bd422",
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
        "conversation.fromUser.collectorProfile.artsyUserSince": (v2/*: any*/),
        "conversation.fromUser.collectorProfile.id": (v3/*: any*/),
        "conversation.fromUser.collectorProfile.isEmailConfirmed": (v4/*: any*/),
        "conversation.fromUser.collectorProfile.isIdentityVerified": (v4/*: any*/),
        "conversation.fromUser.collectorProfile.name": (v2/*: any*/),
        "conversation.fromUser.id": (v3/*: any*/),
        "conversation.fromUser.initials": (v2/*: any*/),
        "conversation.id": (v3/*: any*/)
      }
    },
    "name": "ConversationCollectorProfileHeaderTestQuery",
    "operationKind": "query",
    "text": "query ConversationCollectorProfileHeaderTestQuery {\n  conversation(id: \"conversation-id\") {\n    fromUser {\n      ...ConversationCollectorProfileHeader_user\n      id\n    }\n    id\n  }\n}\n\nfragment ConversationCollectorProfileHeader_user on User {\n  initials\n  collectorProfile {\n    name\n    artsyUserSince(format: \"YYYY\")\n    ...ConversationCollectorProfileVerifications_collectorProfileType\n    id\n  }\n}\n\nfragment ConversationCollectorProfileVerifications_collectorProfileType on CollectorProfileType {\n  isIdentityVerified\n  isEmailConfirmed\n}\n"
  }
};
})();

(node as any).hash = "a5b6ba87a58f66abd04f49d79301290c";

export default node;
