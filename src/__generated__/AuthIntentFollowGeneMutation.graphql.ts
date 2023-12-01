/**
 * @generated SignedSource<<b0d84987a33e59f8a8899227f973f984>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowGeneInput = {
  clientMutationId?: string | null | undefined;
  geneID?: string | null | undefined;
  unfollow?: boolean | null | undefined;
};
export type AuthIntentFollowGeneMutation$variables = {
  input: FollowGeneInput;
};
export type AuthIntentFollowGeneMutation$data = {
  readonly followGene: {
    readonly gene: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentFollowGeneMutation$rawResponse = {
  readonly followGene: {
    readonly gene: {
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentFollowGeneMutation = {
  rawResponse: AuthIntentFollowGeneMutation$rawResponse;
  response: AuthIntentFollowGeneMutation$data;
  variables: AuthIntentFollowGeneMutation$variables;
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
    "concreteType": "FollowGenePayload",
    "kind": "LinkedField",
    "name": "followGene",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
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
    "name": "AuthIntentFollowGeneMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthIntentFollowGeneMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "110b2ca1cf5c520da14160fb867091fa",
    "id": null,
    "metadata": {},
    "name": "AuthIntentFollowGeneMutation",
    "operationKind": "mutation",
    "text": "mutation AuthIntentFollowGeneMutation(\n  $input: FollowGeneInput!\n) {\n  followGene(input: $input) {\n    gene {\n      id\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a18fa8a41ff3cec0a7d85580bb398906";

export default node;
