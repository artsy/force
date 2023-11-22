/**
 * @generated SignedSource<<4e31c506dcd21e9935a57326f10dfde1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateConsignmentInquiryMutationInput = {
  clientMutationId?: string | null | undefined;
  email: string;
  message: string;
  name: string;
  phoneNumber?: string | null | undefined;
  recipientEmail?: string | null | undefined;
  userId?: string | null | undefined;
};
export type useCreateConsignmentInquiryMutation$variables = {
  input: CreateConsignmentInquiryMutationInput;
};
export type useCreateConsignmentInquiryMutation$data = {
  readonly createConsignmentInquiry: {
    readonly consignmentInquiryOrError: {
      readonly consignmentInquiry?: {
        readonly internalID: number;
      } | null | undefined;
      readonly mutationError?: {
        readonly error: string | null | undefined;
        readonly message: string;
        readonly statusCode: number | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useCreateConsignmentInquiryMutation = {
  response: useCreateConsignmentInquiryMutation$data;
  variables: useCreateConsignmentInquiryMutation$variables;
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
      "concreteType": "ConsignmentInquiryMutationError",
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
    "name": "useCreateConsignmentInquiryMutation",
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
    "name": "useCreateConsignmentInquiryMutation",
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
    "cacheID": "a6b6882e5266d9b8ec9595a2ec808a8e",
    "id": null,
    "metadata": {},
    "name": "useCreateConsignmentInquiryMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateConsignmentInquiryMutation(\n  $input: CreateConsignmentInquiryMutationInput!\n) {\n  createConsignmentInquiry(input: $input) {\n    consignmentInquiryOrError {\n      __typename\n      ... on ConsignmentInquiryMutationSuccess {\n        consignmentInquiry {\n          internalID\n        }\n      }\n      ... on ConsignmentInquiryMutationFailure {\n        mutationError {\n          error\n          message\n          statusCode\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bf554465e7221982bbf427483c39596c";

export default node;
