/**
 * @generated SignedSource<<5e0344dbb563a5efb67c58f83db2ca58>>
 * @relayHash 6da2789c92983958072fd2286e794814
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6da2789c92983958072fd2286e794814

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowProfileInput = {
  clientMutationId?: string | null | undefined;
  profileID?: string | null | undefined;
  unfollow?: boolean | null | undefined;
};
export type AuthIntentFollowProfileMutation$variables = {
  input: FollowProfileInput;
};
export type AuthIntentFollowProfileMutation$data = {
  readonly followProfile: {
    readonly profile: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentFollowProfileMutation$rawResponse = {
  readonly followProfile: {
    readonly profile: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentFollowProfileMutation = {
  rawResponse: AuthIntentFollowProfileMutation$rawResponse;
  response: AuthIntentFollowProfileMutation$data;
  variables: AuthIntentFollowProfileMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowProfilePayload",
    "kind": "LinkedField",
    "name": "followProfile",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "profile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          }
        ],
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
    "name": "AuthIntentFollowProfileMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthIntentFollowProfileMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "6da2789c92983958072fd2286e794814",
    "metadata": {},
    "name": "AuthIntentFollowProfileMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "aecf1a9e59ed2ca93594e3cecc4aaa00";

export default node;
