/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type IntendedState = "ACCEPTED" | "REJECTED" | "REVIEW" | "%future added value";
export type CreateOfferResponseMutationInput = {
    clientMutationId?: string | null | undefined;
    comments?: string | null | undefined;
    intendedState: IntendedState;
    offerId: string;
    phoneNumber?: string | null | undefined;
    rejectionReason?: string | null | undefined;
};
export type CreateOfferResponseMutationVariables = {
    input: CreateOfferResponseMutationInput;
};
export type CreateOfferResponseMutationResponse = {
    readonly createConsignmentOfferResponse: {
        readonly consignmentOfferResponse: {
            readonly intendedState: IntendedState;
        } | null;
    } | null;
};
export type CreateOfferResponseMutation = {
    readonly response: CreateOfferResponseMutationResponse;
    readonly variables: CreateOfferResponseMutationVariables;
};



/*
mutation CreateOfferResponseMutation(
  $input: CreateOfferResponseMutationInput!
) {
  createConsignmentOfferResponse(input: $input) {
    consignmentOfferResponse {
      intendedState
      id
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intendedState",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateOfferResponseMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateOfferResponseMutationPayload",
        "kind": "LinkedField",
        "name": "createConsignmentOfferResponse",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "OfferResponse",
            "kind": "LinkedField",
            "name": "consignmentOfferResponse",
            "plural": false,
            "selections": [
              (v2/*: any*/)
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
    "name": "CreateOfferResponseMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateOfferResponseMutationPayload",
        "kind": "LinkedField",
        "name": "createConsignmentOfferResponse",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "OfferResponse",
            "kind": "LinkedField",
            "name": "consignmentOfferResponse",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7dce3397285769fd207b8601337f9d37",
    "id": null,
    "metadata": {},
    "name": "CreateOfferResponseMutation",
    "operationKind": "mutation",
    "text": "mutation CreateOfferResponseMutation(\n  $input: CreateOfferResponseMutationInput!\n) {\n  createConsignmentOfferResponse(input: $input) {\n    consignmentOfferResponse {\n      intendedState\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c62173b99e9ba5703c2630c0b0478681';
export default node;
