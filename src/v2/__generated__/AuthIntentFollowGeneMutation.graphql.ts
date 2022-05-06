/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FollowGeneInput = {
    clientMutationId?: string | null | undefined;
    geneID?: string | null | undefined;
    unfollow?: boolean | null | undefined;
};
export type AuthIntentFollowGeneMutationVariables = {
    input: FollowGeneInput;
};
export type AuthIntentFollowGeneMutationResponse = {
    readonly followGene: {
        readonly gene: {
            readonly id: string;
            readonly isFollowed: boolean | null;
        } | null;
    } | null;
};
export type AuthIntentFollowGeneMutation = {
    readonly response: AuthIntentFollowGeneMutationResponse;
    readonly variables: AuthIntentFollowGeneMutationVariables;
};



/*
mutation AuthIntentFollowGeneMutation(
  $input: FollowGeneInput!
) {
  followGene(input: $input) {
    gene {
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
(node as any).hash = '067e148f5eedd5e8193dadfce447ebbf';
export default node;
