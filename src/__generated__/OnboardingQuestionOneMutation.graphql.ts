/**
 * @generated SignedSource<<d607ef4ec3a073efe289e3947978e3cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type OnboardingQuestionOneMutation$variables = {
  collectorLevel: number;
};
export type OnboardingQuestionOneMutation$data = {
  readonly updateMyUserProfile: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type OnboardingQuestionOneMutation = {
  response: OnboardingQuestionOneMutation$data;
  variables: OnboardingQuestionOneMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "collectorLevel"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "collectorLevel",
            "variableName": "collectorLevel"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateMyProfilePayload",
    "kind": "LinkedField",
    "name": "updateMyUserProfile",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OnboardingQuestionOneMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OnboardingQuestionOneMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "76679c257063be6cf3d06d2c8a03acc4",
    "id": null,
    "metadata": {},
    "name": "OnboardingQuestionOneMutation",
    "operationKind": "mutation",
    "text": "mutation OnboardingQuestionOneMutation(\n  $collectorLevel: Int!\n) {\n  updateMyUserProfile(input: {collectorLevel: $collectorLevel}) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "03e662450934de12f0bb2c51879ace20";

export default node;
