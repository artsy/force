/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateBackupSecondFactorsInput = {
    clientMutationId?: string | null;
    password?: string | null;
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateBackupSecondFactorsInput!"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "BackupSecondFactor",
      "kind": "LinkedField",
      "name": "secondFactors",
      "plural": true,
      "selections": [
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "BackupSecondFactors"
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Error",
      "kind": "LinkedField",
      "name": "errors",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Errors"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateBackupSecondFactorsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBackupSecondFactorsPayload",
        "kind": "LinkedField",
        "name": "createBackupSecondFactors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactorsOrErrors",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateBackupSecondFactorsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBackupSecondFactorsPayload",
        "kind": "LinkedField",
        "name": "createBackupSecondFactors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactorsOrErrors",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CreateBackupSecondFactorsMutation",
    "operationKind": "mutation",
    "text": "mutation CreateBackupSecondFactorsMutation(\n  $input: CreateBackupSecondFactorsInput!\n) {\n  createBackupSecondFactors(input: $input) {\n    secondFactorsOrErrors {\n      __typename\n      ... on BackupSecondFactors {\n        __typename\n        secondFactors {\n          code\n        }\n      }\n      ... on Errors {\n        __typename\n        errors {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bcf355b344cd120155860af9215df977';
export default node;
