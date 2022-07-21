/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FollowProfileInput = {
    clientMutationId?: string | null | undefined;
    profileID?: string | null | undefined;
    unfollow?: boolean | null | undefined;
};
export type FollowProfileButtonMutationVariables = {
    input: FollowProfileInput;
};
export type FollowProfileButtonMutationResponse = {
    readonly followProfile: {
        readonly profile: {
            readonly id: string;
            readonly isFollowed: boolean | null;
        } | null;
    } | null;
};
export type FollowProfileButtonMutation = {
    readonly response: FollowProfileButtonMutationResponse;
    readonly variables: FollowProfileButtonMutationVariables;
};



/*
mutation FollowProfileButtonMutation(
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
    "name": "FollowProfileButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowProfileButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9114abb5a82e2df610c2ccdae0a8bf44",
    "id": null,
    "metadata": {},
    "name": "FollowProfileButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowProfileButtonMutation(\n  $input: FollowProfileInput!\n) {\n  followProfile(input: $input) {\n    profile {\n      id\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f3ac77cf6f3bdc0d0ce912fa06939749';
export default node;
