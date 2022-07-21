/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FollowGeneInput = {
    clientMutationId?: string | null | undefined;
    geneID?: string | null | undefined;
    unfollow?: boolean | null | undefined;
};
export type FollowGeneButtonMutationVariables = {
    input: FollowGeneInput;
};
export type FollowGeneButtonMutationResponse = {
    readonly followGene: {
        readonly gene: {
            readonly id: string;
            readonly isFollowed: boolean | null;
        } | null;
    } | null;
};
export type FollowGeneButtonMutation = {
    readonly response: FollowGeneButtonMutationResponse;
    readonly variables: FollowGeneButtonMutationVariables;
};



/*
mutation FollowGeneButtonMutation(
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
    "name": "FollowGeneButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowGeneButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "42eda4250d17d91078126d56aacee48f",
    "id": null,
    "metadata": {},
    "name": "FollowGeneButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowGeneButtonMutation(\n  $input: FollowGeneInput!\n) {\n  followGene(input: $input) {\n    gene {\n      id\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'be2ec481552194cc0bbd5b2f4be85ee6';
export default node;
