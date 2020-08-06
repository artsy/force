/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowGeneInput = {
    readonly clientMutationId?: string | null;
    readonly geneID?: string | null;
};
export type FollowGeneButtonMutationVariables = {
    input: FollowGeneInput;
};
export type FollowGeneButtonMutationResponse = {
    readonly followGene: {
        readonly gene: {
            readonly id: string;
            readonly is_followed: boolean | null;
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
      is_followed: isFollowed
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowGeneInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "followGene",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowGenePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "gene",
        "storageKey": null,
        "args": null,
        "concreteType": "Gene",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_followed",
            "name": "isFollowed",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FollowGeneButtonMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "FollowGeneButtonMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "FollowGeneButtonMutation",
    "id": null,
    "text": "mutation FollowGeneButtonMutation(\n  $input: FollowGeneInput!\n) {\n  followGene(input: $input) {\n    gene {\n      id\n      is_followed: isFollowed\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '6e730f396b1bfca255e1e35cb6913dda';
export default node;
