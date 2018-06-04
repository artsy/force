/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowGeneButtonMutationVariables = {
    readonly input: {
        readonly gene_id: string | null;
        readonly clientMutationId: string | null;
    };
};
export type FollowGeneButtonMutationResponse = {
    readonly followGene: ({
        readonly gene: ({
            readonly is_followed: boolean | null;
        }) | null;
    }) | null;
};



/*
mutation FollowGeneButtonMutation(
  $input: FollowGeneInput!
) {
  followGene(input: $input) {
    gene {
      is_followed
      __id
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
        "variableName": "input",
        "type": "FollowGeneInput!"
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
            "name": "is_followed",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__id",
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
  "operationKind": "mutation",
  "name": "FollowGeneButtonMutation",
  "id": null,
  "text": "mutation FollowGeneButtonMutation(\n  $input: FollowGeneInput!\n) {\n  followGene(input: $input) {\n    gene {\n      is_followed\n      __id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "FollowGeneButtonMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "FollowGeneButtonMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'ea86451980173904af773f09c2fa4e03';
export default node;
