/**
 * @generated SignedSource<<b55b9bb923bf337c8dfec6995c9a34f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateConversationMutationInput = {
  clientMutationId?: string | null;
  conversationId: string;
  dismissed?: boolean | null;
  fromLastViewedMessageId?: string | null;
  sellerOutcome?: string | null;
  sellerOutcomeComment?: string | null;
};
export type useDismissInquiryMutation$variables = {
  input: UpdateConversationMutationInput;
};
export type useDismissInquiryMutation$data = {
  readonly updateConversation: {
    readonly conversation: {
      readonly internalID: string | null;
    } | null;
  } | null;
};
export type useDismissInquiryMutation = {
  response: useDismissInquiryMutation$data;
  variables: useDismissInquiryMutation$variables;
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
  "name": "internalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDismissInquiryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateConversationMutationPayload",
        "kind": "LinkedField",
        "name": "updateConversation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDismissInquiryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateConversationMutationPayload",
        "kind": "LinkedField",
        "name": "updateConversation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "323c7b7c7fb84d377143fe4df411c429",
    "id": null,
    "metadata": {},
    "name": "useDismissInquiryMutation",
    "operationKind": "mutation",
    "text": "mutation useDismissInquiryMutation(\n  $input: UpdateConversationMutationInput!\n) {\n  updateConversation(input: $input) {\n    conversation {\n      internalID\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f02d84b3d0daabdd0cd96b729e782e48";

export default node;
