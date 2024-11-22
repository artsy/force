/**
 * @generated SignedSource<<51dceab08da6edb91e48942f596693e0>>
 * @relayHash a6b6882e5266d9b8ec9595a2ec808a8e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a6b6882e5266d9b8ec9595a2ec808a8e

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
    "id": "a6b6882e5266d9b8ec9595a2ec808a8e",
    "metadata": {},
    "name": "useCreateConsignmentInquiryMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "bf554465e7221982bbf427483c39596c";

export default node;
