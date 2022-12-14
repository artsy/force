/**
 * @generated SignedSource<<ef28876dc4b575581d4c9052397f1297>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateConsignmentInquiryMutationInput = {
  clientMutationId?: string | null;
  email: string;
  message: string;
  name: string;
  phoneNumber?: string | null;
  userId?: string | null;
};
export type createConsignmentInquiryMutation$variables = {
  input: CreateConsignmentInquiryMutationInput;
};
export type createConsignmentInquiryMutation$data = {
  readonly createConsignmentInquiry: {
    readonly consignmentInquiryOrError: {
      readonly consignmentInquiry?: {
        readonly internalID: number;
      } | null;
      readonly mutationError?: {
        readonly error: string | null;
        readonly message: string;
        readonly statusCode: number | null;
      } | null;
    } | null;
  } | null;
};
export type createConsignmentInquiryMutation = {
  response: createConsignmentInquiryMutation$data;
  variables: createConsignmentInquiryMutation$variables;
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
      "concreteType": "ConsignmentInquiry",
      "kind": "LinkedField",
      "name": "consignmentInquiry",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentInquiryMutationSuccess",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "statusCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentInquiryMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createConsignmentInquiryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateConsignmentInquiryMutationPayload",
        "kind": "LinkedField",
        "name": "createConsignmentInquiry",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "consignmentInquiryOrError",
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
    "name": "createConsignmentInquiryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateConsignmentInquiryMutationPayload",
        "kind": "LinkedField",
        "name": "createConsignmentInquiry",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "consignmentInquiryOrError",
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
    "cacheID": "1d19406deffb7e992e9f331074549f22",
    "id": null,
    "metadata": {},
    "name": "createConsignmentInquiryMutation",
    "operationKind": "mutation",
    "text": "mutation createConsignmentInquiryMutation(\n  $input: CreateConsignmentInquiryMutationInput!\n) {\n  createConsignmentInquiry(input: $input) {\n    consignmentInquiryOrError {\n      __typename\n      ... on ConsignmentInquiryMutationSuccess {\n        consignmentInquiry {\n          internalID\n        }\n      }\n      ... on ConsignmentInquiryMutationFailure {\n        mutationError {\n          error\n          message\n          statusCode\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6d8dcec2fcaff62a1c45864ea133154a";

export default node;
