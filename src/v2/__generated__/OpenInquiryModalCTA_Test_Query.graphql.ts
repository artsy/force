/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OpenInquiryModalCTA_Test_QueryVariables = {};
export type OpenInquiryModalCTA_Test_QueryResponse = {
    readonly me: {
        readonly conversation: {
            readonly " $fragmentRefs": FragmentRefs<"OpenInquiryModalCTA_conversation">;
        } | null;
    } | null;
};
export type OpenInquiryModalCTA_Test_Query = {
    readonly response: OpenInquiryModalCTA_Test_QueryResponse;
    readonly variables: OpenInquiryModalCTA_Test_QueryVariables;
};



/*
query OpenInquiryModalCTA_Test_Query {
  me {
    conversation(id: "123") {
      ...OpenInquiryModalCTA_conversation
      id
    }
    id
  }
}

fragment OpenInquiryModalCTA_conversation on Conversation {
  internalID
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OpenInquiryModalCTA_Test_Query",
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
                "name": "OpenInquiryModalCTA_conversation"
              }
            ],
            "storageKey": "conversation(id:\"123\")"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OpenInquiryModalCTA_Test_Query",
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
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "conversation(id:\"123\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversation": {
          "type": "Conversation",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v2/*: any*/),
        "me.conversation.id": (v2/*: any*/),
        "me.conversation.internalID": (v2/*: any*/)
      }
    },
    "name": "OpenInquiryModalCTA_Test_Query",
    "operationKind": "query",
    "text": "query OpenInquiryModalCTA_Test_Query {\n  me {\n    conversation(id: \"123\") {\n      ...OpenInquiryModalCTA_conversation\n      id\n    }\n    id\n  }\n}\n\nfragment OpenInquiryModalCTA_conversation on Conversation {\n  internalID\n}\n"
  }
};
})();
(node as any).hash = 'e870b65b35253ed30121ba9911df012d';
export default node;
