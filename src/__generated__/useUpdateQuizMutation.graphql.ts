/**
 * @generated SignedSource<<80e94de58cc24adad924ad28cf9baec9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type updateQuizMutationInput = {
  artworkId: string;
  clearInteraction?: boolean | null | undefined;
  clientMutationId?: string | null | undefined;
  userId: string;
};
export type useUpdateQuizMutation$variables = {
  input: updateQuizMutationInput;
};
export type useUpdateQuizMutation$data = {
  readonly updateQuiz: {
    readonly quiz: {
      readonly completedAt: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useUpdateQuizMutation = {
  response: useUpdateQuizMutation$data;
  variables: useUpdateQuizMutation$variables;
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
  "name": "completedAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateQuizMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateQuizMutationPayload",
        "kind": "LinkedField",
        "name": "updateQuiz",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Quiz",
            "kind": "LinkedField",
            "name": "quiz",
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
    "name": "useUpdateQuizMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateQuizMutationPayload",
        "kind": "LinkedField",
        "name": "updateQuiz",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Quiz",
            "kind": "LinkedField",
            "name": "quiz",
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
    "cacheID": "2f96b77a7ff92a55654ad4103f8710cd",
    "id": null,
    "metadata": {},
    "name": "useUpdateQuizMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateQuizMutation(\n  $input: updateQuizMutationInput!\n) {\n  updateQuiz(input: $input) {\n    quiz {\n      completedAt\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "abfee44a773cd61f332a6e37f327102b";

export default node;
