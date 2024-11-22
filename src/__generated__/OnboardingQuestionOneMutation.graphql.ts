/**
 * @generated SignedSource<<862e9dc78b66447b082405c3203923e2>>
 * @relayHash 76679c257063be6cf3d06d2c8a03acc4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 76679c257063be6cf3d06d2c8a03acc4

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
    "id": "76679c257063be6cf3d06d2c8a03acc4",
    "metadata": {},
    "name": "OnboardingQuestionOneMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "03e662450934de12f0bb2c51879ace20";

export default node;
