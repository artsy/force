/**
 * @generated SignedSource<<e12d0b9f127db76be9734e1bb0cf95c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowProfileInput = {
  clientMutationId?: string | null | undefined;
  profileID?: string | null | undefined;
  unfollow?: boolean | null | undefined;
};
export type FairOrganizerFollowMutation$variables = {
  input: FollowProfileInput;
};
export type FairOrganizerFollowMutation$data = {
  readonly followProfile: {
    readonly profile: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type FairOrganizerFollowMutation$rawResponse = {
  readonly followProfile: {
    readonly profile: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type FairOrganizerFollowMutation = {
  rawResponse: FairOrganizerFollowMutation$rawResponse;
  response: FairOrganizerFollowMutation$data;
  variables: FairOrganizerFollowMutation$variables;
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
    "name": "FairOrganizerFollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FairOrganizerFollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d26c8c51b0a41c29451b00f1018c16bf",
    "id": null,
    "metadata": {},
    "name": "FairOrganizerFollowMutation",
    "operationKind": "mutation",
    "text": "mutation FairOrganizerFollowMutation(\n  $input: FollowProfileInput!\n) {\n  followProfile(input: $input) {\n    profile {\n      id\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9d056b58780248b9e74b3dc8b7a7eace";

export default node;
