/**
 * @generated SignedSource<<679e9da2be6e71fd5da2d6a1b4d993ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type createAdvisoryOpportunityMutationInput = {
  clientMutationId?: string | null | undefined;
  message?: string | null | undefined;
  phoneCountryCode?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  searchCriteriaID: string;
};
export type useCreateAdvisoryOpportunityMutation$variables = {
  input: createAdvisoryOpportunityMutationInput;
};
export type useCreateAdvisoryOpportunityMutation$data = {
  readonly createAdvisoryOpportunity: {
    readonly advisoryOpportunityOrError: {
      readonly advisoryOpportunity?: {
        readonly internalID: string;
      };
      readonly mutationError?: {
        readonly message: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useCreateAdvisoryOpportunityMutation = {
  response: useCreateAdvisoryOpportunityMutation$data;
  variables: useCreateAdvisoryOpportunityMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
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
  "type": "createAdvisoryOpportunityFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateAdvisoryOpportunityMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "createAdvisoryOpportunityMutationPayload",
        "kind": "LinkedField",
        "name": "createAdvisoryOpportunity",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "advisoryOpportunityOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AdvisoryOpportunity",
                    "kind": "LinkedField",
                    "name": "advisoryOpportunity",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "createAdvisoryOpportunitySuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateAdvisoryOpportunityMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "createAdvisoryOpportunityMutationPayload",
        "kind": "LinkedField",
        "name": "createAdvisoryOpportunity",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "advisoryOpportunityOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AdvisoryOpportunity",
                    "kind": "LinkedField",
                    "name": "advisoryOpportunity",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "createAdvisoryOpportunitySuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "831699e5690e39a41fe93ba5e9bd2fcc",
    "id": null,
    "metadata": {},
    "name": "useCreateAdvisoryOpportunityMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateAdvisoryOpportunityMutation(\n  $input: createAdvisoryOpportunityMutationInput!\n) {\n  createAdvisoryOpportunity(input: $input) {\n    advisoryOpportunityOrError {\n      __typename\n      ... on createAdvisoryOpportunitySuccess {\n        advisoryOpportunity {\n          internalID\n          id\n        }\n      }\n      ... on createAdvisoryOpportunityFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dcc29136ff3fb3beb24b2206e6a6c7f9";

export default node;
