/**
 * @generated SignedSource<<de5b20595f36661e591b7b2ce60edb0f>>
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
export type AuthIntentFollowMarketingCollectionMutation$variables = {
  input: FollowMarketingCollectionInput;
};
export type AuthIntentFollowMarketingCollectionMutation$data = {
  readonly followMarketingCollection: {
    readonly marketingCollection: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentFollowMarketingCollectionMutation$rawResponse = {
  readonly followMarketingCollection: {
    readonly marketingCollection: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentFollowMarketingCollectionMutation = {
  rawResponse: AuthIntentFollowMarketingCollectionMutation$rawResponse;
  response: AuthIntentFollowMarketingCollectionMutation$data;
  variables: AuthIntentFollowMarketingCollectionMutation$variables;
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
    "name": "AuthIntentFollowMarketingCollectionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthIntentFollowMarketingCollectionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7c4c79c85af5012ded7cdd12f1a6a482",
    "id": null,
    "metadata": {},
    "name": "AuthIntentFollowMarketingCollectionMutation",
    "operationKind": "mutation",
    "text": "mutation AuthIntentFollowMarketingCollectionMutation(\n  $input: FollowMarketingCollectionInput!\n) {\n  followMarketingCollection(input: $input) {\n    marketingCollection {\n      id\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "04913bb37662f7cdd7f8f331f4958c94";

export default node;
