/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateBackupSecondFactorsInput = {
    readonly clientMutationId?: string | null;
};
export type CreateBackupSecondFactorsMutationVariables = {
    input: CreateBackupSecondFactorsInput;
};
export type CreateBackupSecondFactorsMutationResponse = {
    readonly createBackupSecondFactors: {
        readonly secondFactorsOrErrors: {
            readonly __typename: "BackupSecondFactors";
            readonly secondFactors: ReadonlyArray<{
                readonly code: string;
            }>;
        } | {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly code: string;
                readonly message: string;
            }>;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        };
    } | null;
};
export type CreateBackupSecondFactorsMutation = {
    readonly response: CreateBackupSecondFactorsMutationResponse;
    readonly variables: CreateBackupSecondFactorsMutationVariables;
};



/*
mutation CreateBackupSecondFactorsMutation(
  $input: CreateBackupSecondFactorsInput!
) {
  createBackupSecondFactors(input: $input) {
    secondFactorsOrErrors {
      __typename
      ... on BackupSecondFactors {
        __typename
        secondFactors {
          code
        }
      }
      ... on Errors {
        __typename
        errors {
          code
          message
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateBackupSecondFactorsInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "type": "BackupSecondFactors",
  "selections": [
    (v2/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "secondFactors",
      "storageKey": null,
      "args": null,
      "concreteType": "BackupSecondFactor",
      "plural": true,
      "selections": [
        (v3/*: any*/)
      ]
    }
  ]
},
v5 = {
  "kind": "InlineFragment",
  "type": "Errors",
  "selections": [
    (v2/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "errors",
      "storageKey": null,
      "args": null,
      "concreteType": "Error",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "message",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateBackupSecondFactorsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBackupSecondFactors",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBackupSecondFactorsPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "secondFactorsOrErrors",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateBackupSecondFactorsMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBackupSecondFactors",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBackupSecondFactorsPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "secondFactorsOrErrors",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateBackupSecondFactorsMutation",
    "id": null,
    "text": "mutation CreateBackupSecondFactorsMutation(\n  $input: CreateBackupSecondFactorsInput!\n) {\n  createBackupSecondFactors(input: $input) {\n    secondFactorsOrErrors {\n      __typename\n      ... on BackupSecondFactors {\n        __typename\n        secondFactors {\n          code\n        }\n      }\n      ... on Errors {\n        __typename\n        errors {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'bcf355b344cd120155860af9215df977';
export default node;
