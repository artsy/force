/**
 * @generated SignedSource<<87cfadd3edb491327795c895b7636c89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowProfileInput = {
  clientMutationId?: string | null;
  profileID?: string | null;
  unfollow?: boolean | null;
};
export type FollowProfileButtonMutation$variables = {
  input: FollowProfileInput;
};
export type FollowProfileButtonMutation$data = {
  readonly followProfile: {
    readonly profile: {
      readonly id: string;
      readonly is_followed: boolean | null;
    } | null;
  } | null;
};
export type FollowProfileButtonMutation = {
  variables: FollowProfileButtonMutation$variables;
  response: FollowProfileButtonMutation$data;
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
            "alias": "is_followed",
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
    "cacheID": "1c1b6c4931b2dbe3029e2bce65d6a025",
    "id": null,
    "metadata": {},
    "name": "FollowProfileButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowProfileButtonMutation(\n  $input: FollowProfileInput!\n) {\n  followProfile(input: $input) {\n    profile {\n      id\n      is_followed: isFollowed\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fa116a6824af830210198ab020a8d472";

export default node;
