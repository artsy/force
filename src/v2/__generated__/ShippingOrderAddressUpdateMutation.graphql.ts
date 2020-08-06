/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderFulfillmentTypeEnum = "PICKUP" | "SHIP" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceSetShippingInput = {
    readonly clientMutationId?: string | null;
    readonly fulfillmentType: CommerceOrderFulfillmentTypeEnum;
    readonly id: string;
    readonly phoneNumber?: string | null;
    readonly shipping?: CommerceShippingAttributes | null;
};
export type CommerceShippingAttributes = {
    readonly addressLine1?: string | null;
    readonly addressLine2?: string | null;
    readonly city?: string | null;
    readonly country?: string | null;
    readonly name?: string | null;
    readonly phoneNumber?: string | null;
    readonly postalCode?: string | null;
    readonly region?: string | null;
};
export type ShippingOrderAddressUpdateMutationVariables = {
    input: CommerceSetShippingInput;
};
export type ShippingOrderAddressUpdateMutationResponse = {
    readonly commerceSetShipping: {
        readonly orderOrError: {
            readonly __typename: "CommerceOrderWithMutationSuccess";
            readonly order?: {
                readonly internalID: string;
                readonly state: CommerceOrderStateEnum;
                readonly requestedFulfillment: ({
                    readonly __typename: "CommerceShip";
                    readonly name: string | null;
                    readonly addressLine1: string | null;
                    readonly addressLine2: string | null;
                    readonly city: string | null;
                    readonly region: string | null;
                    readonly country: string | null;
                    readonly postalCode: string | null;
                    readonly phoneNumber: string | null;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
            };
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
        };
    } | null;
};
export type ShippingOrderAddressUpdateMutation = {
    readonly response: ShippingOrderAddressUpdateMutationResponse;
    readonly variables: ShippingOrderAddressUpdateMutationVariables;
};



/*
mutation ShippingOrderAddressUpdateMutation(
  $input: CommerceSetShippingInput!
) {
  commerceSetShipping(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationSuccess {
        __typename
        order {
          __typename
          internalID
          state
          requestedFulfillment {
            __typename
            ... on CommerceShip {
              name
              addressLine1
              addressLine2
              city
              region
              country
              postalCode
              phoneNumber
            }
          }
          id
        }
      }
      ... on CommerceOrderWithMutationFailure {
        error {
          type
          code
          data
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
    "type": "CommerceSetShippingInput!",
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
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "requestedFulfillment",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "kind": "InlineFragment",
      "type": "CommerceShip",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "addressLine1",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "addressLine2",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "city",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "region",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "country",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "postalCode",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "phoneNumber",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v6 = {
  "kind": "InlineFragment",
  "type": "CommerceOrderWithMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "error",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "code",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "data",
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
    "name": "ShippingOrderAddressUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceSetShipping",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetShippingPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "CommerceOrderWithMutationSuccess",
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  }
                ]
              },
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingOrderAddressUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceSetShipping",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetShippingPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "CommerceOrderWithMutationSuccess",
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "ShippingOrderAddressUpdateMutation",
    "id": null,
    "text": "mutation ShippingOrderAddressUpdateMutation(\n  $input: CommerceSetShippingInput!\n) {\n  commerceSetShipping(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          internalID\n          state\n          requestedFulfillment {\n            __typename\n            ... on CommerceShip {\n              name\n              addressLine1\n              addressLine2\n              city\n              region\n              country\n              postalCode\n              phoneNumber\n            }\n          }\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b01b849a4040a3d42a3535fdc70caeef';
export default node;
