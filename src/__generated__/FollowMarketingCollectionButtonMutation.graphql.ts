/**
 * @generated SignedSource<<b916d791832badbf4ff3b52dc37d6f6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FollowMarketingCollectionInput = {
  clientMutationId?: string | null | undefined;
  marketingCollectionID?: string | null | undefined;
  unfollow?: boolean | null | undefined;
};
export type FollowMarketingCollectionButtonMutation$variables = {
  input: FollowMarketingCollectionInput;
};
export type FollowMarketingCollectionButtonMutation$data = {
  readonly followMarketingCollection: {
    readonly marketingCollection: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type FollowMarketingCollectionButtonMutation = {
  response: FollowMarketingCollectionButtonMutation$data;
  variables: FollowMarketingCollectionButtonMutation$variables;
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
    "concreteType": "FollowMarketingCollectionPayload",
    "kind": "LinkedField",
    "name": "followMarketingCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
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
    "name": "FollowMarketingCollectionButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowMarketingCollectionButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "95fcc4e0373fb0cb24fdbd7fab876ee1",
    "id": null,
    "metadata": {},
    "name": "FollowMarketingCollectionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowMarketingCollectionButtonMutation(\n  $input: FollowMarketingCollectionInput!\n) {\n  followMarketingCollection(input: $input) {\n    marketingCollection {\n      id\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "900253fae6b623828661f9c0269c17ec";

export default node;
