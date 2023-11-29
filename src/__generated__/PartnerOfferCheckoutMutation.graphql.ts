/**
 * @generated SignedSource<<cc8eeeb057c7bb48df7fff5cab11a07d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceCreatePartnerOfferOrderInput = {
  clientMutationId?: string | null | undefined;
  editionSetId?: string | null | undefined;
  partnerOfferId: string;
  quantity?: number | null | undefined;
};
export type PartnerOfferCheckoutMutation$variables = {
  input: CommerceCreatePartnerOfferOrderInput;
};
export type PartnerOfferCheckoutMutation$data = {
  readonly commerceCreatePartnerOfferOrder: {
    readonly orderOrError: {
      readonly __typename: "CommerceOrderWithMutationSuccess";
      readonly error?: {
        readonly code: string;
        readonly data: string | null | undefined;
        readonly type: string;
      };
      readonly order?: {
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null | undefined;
      };
    };
  } | null | undefined;
};
export type PartnerOfferCheckoutMutation = {
  response: PartnerOfferCheckoutMutation$data;
  variables: PartnerOfferCheckoutMutation$variables;
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mode",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
      "kind": "LinkedField",
      "name": "error",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "data",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrderWithMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerOfferCheckoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceCreatePartnerOfferOrderPayload",
        "kind": "LinkedField",
        "name": "commerceCreatePartnerOfferOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
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
    "name": "PartnerOfferCheckoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceCreatePartnerOfferOrderPayload",
        "kind": "LinkedField",
        "name": "commerceCreatePartnerOfferOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
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
    "cacheID": "ee033eb77486da718116506d4eae598c",
    "id": null,
    "metadata": {},
    "name": "PartnerOfferCheckoutMutation",
    "operationKind": "mutation",
    "text": "mutation PartnerOfferCheckoutMutation(\n  $input: CommerceCreatePartnerOfferOrderInput!\n) {\n  commerceCreatePartnerOfferOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          internalID\n          mode\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ecb22efb883dce15ff70edfe53becf15";

export default node;
