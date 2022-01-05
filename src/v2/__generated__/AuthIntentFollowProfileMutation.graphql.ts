/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowProfileInput = {
    clientMutationId?: string | null;
    profileID?: string | null;
    unfollow?: boolean | null;
};
export type AuthIntentFollowProfileMutationVariables = {
    input: FollowProfileInput;
};
export type AuthIntentFollowProfileMutationResponse = {
    readonly followProfile: {
        readonly profile: {
            readonly id: string;
            readonly isFollowed: boolean | null;
        } | null;
    } | null;
};
export type AuthIntentFollowProfileMutation = {
    readonly response: AuthIntentFollowProfileMutationResponse;
    readonly variables: AuthIntentFollowProfileMutationVariables;
};



/*
mutation AuthIntentFollowProfileMutation(
  $input: FollowProfileInput!
) {
  followProfile(input: $input) {
    profile {
      id
      isFollowed
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowProfileInput!"
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
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthIntentFollowProfileMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AuthIntentFollowProfileMutation",
    "operationKind": "mutation",
    "text": "mutation AuthIntentFollowProfileMutation(\n  $input: FollowProfileInput!\n) {\n  followProfile(input: $input) {\n    profile {\n      id\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '567bc4b1dea32242bc6a8eb0d9b51f90';
export default node;
