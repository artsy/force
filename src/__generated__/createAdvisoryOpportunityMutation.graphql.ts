/**
 * @generated SignedSource<<de27bbbc76928c966a5ab8159982f743>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type createAdvisoryOpportunityMutationInput = {
  clientMutationId?: string | null;
  message?: string | null;
  phoneCountryCode?: string | null;
  phoneNumber?: string | null;
  searchCriteriaID: string;
};
export type createAdvisoryOpportunityMutation$variables = {
  input: createAdvisoryOpportunityMutationInput;
};
export type createAdvisoryOpportunityMutation$data = {
  readonly createAdvisoryOpportunity: {
    readonly advisoryOpportunityOrError: {
      readonly advisoryOpportunity?: {
        readonly internalID: string;
      };
    } | null;
  } | null;
};
export type createAdvisoryOpportunityMutation = {
  response: createAdvisoryOpportunityMutation$data;
  variables: createAdvisoryOpportunityMutation$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createAdvisoryOpportunityMutation",
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
              }
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
    "name": "createAdvisoryOpportunityMutation",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5d913be236b97556bf33cca432983d27",
    "id": null,
    "metadata": {},
    "name": "createAdvisoryOpportunityMutation",
    "operationKind": "mutation",
    "text": "mutation createAdvisoryOpportunityMutation(\n  $input: createAdvisoryOpportunityMutationInput!\n) {\n  createAdvisoryOpportunity(input: $input) {\n    advisoryOpportunityOrError {\n      __typename\n      ... on createAdvisoryOpportunitySuccess {\n        advisoryOpportunity {\n          internalID\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4bd9a1d3c3839f53ee07aa98bb93f083";

export default node;
