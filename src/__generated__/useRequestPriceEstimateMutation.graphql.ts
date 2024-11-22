/**
 * @generated SignedSource<<a82c7ab06d3eb773215d53512c8d0c9d>>
 * @relayHash cae7f2374f87052f35959448a221bcf8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID cae7f2374f87052f35959448a221bcf8

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RequestPriceEstimateInput = {
  artworkId: string;
  clientMutationId?: string | null | undefined;
  requesterEmail?: string | null | undefined;
  requesterName?: string | null | undefined;
  requesterPhoneNumber?: string | null | undefined;
};
export type useRequestPriceEstimateMutation$variables = {
  input: RequestPriceEstimateInput;
};
export type useRequestPriceEstimateMutation$data = {
  readonly requestPriceEstimate: {
    readonly priceEstimateParamsOrError: {
      readonly mutationError?: {
        readonly error: string | null | undefined;
      } | null | undefined;
      readonly submittedPriceEstimateParams?: {
        readonly artworkId: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useRequestPriceEstimateMutation = {
  response: useRequestPriceEstimateMutation$data;
  variables: useRequestPriceEstimateMutation$variables;
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmittedPriceEstimateParams",
      "kind": "LinkedField",
      "name": "submittedPriceEstimateParams",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworkId",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RequestPriceEstimatedMutationSuccess",
  "abstractKey": null
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
          "name": "error",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RequestPriceEstimatedMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useRequestPriceEstimateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RequestPriceEstimatePayload",
        "kind": "LinkedField",
        "name": "requestPriceEstimate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "priceEstimateParamsOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    "name": "useRequestPriceEstimateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RequestPriceEstimatePayload",
        "kind": "LinkedField",
        "name": "requestPriceEstimate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "priceEstimateParamsOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
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
    "id": "cae7f2374f87052f35959448a221bcf8",
    "metadata": {},
    "name": "useRequestPriceEstimateMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "63a8d03ae8632414c5f72544b2bedcde";

export default node;
