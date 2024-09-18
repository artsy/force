/**
 * @generated SignedSource<<394f8169e43dcebe96c577b8a0c483e3>>
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
export type FollowGeneButtonMutation$variables = {
  input: FollowGeneInput;
};
export type FollowGeneButtonMutation$data = {
  readonly followGene: {
    readonly gene: {
      readonly id: string;
      readonly internalID: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type FollowGeneButtonMutation = {
  response: FollowGeneButtonMutation$data;
  variables: FollowGeneButtonMutation$variables;
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
            "name": "internalID",
            "storageKey": null
          },
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
    "cacheID": "69ad736d515f8be869602c0d7d978025",
    "id": null,
    "metadata": {},
    "name": "FollowGeneButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowGeneButtonMutation(\n  $input: FollowGeneInput!\n) {\n  followGene(input: $input) {\n    gene {\n      internalID\n      id\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3019544a29e0648c8c1c016bcebd0569";

export default node;
