/**
 * @generated SignedSource<<17eb1120a6db760e91a33fbd93fd0105>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type acceptSellerOfferInput = {
  clientMutationId?: string | null | undefined;
  offerID: string;
  orderID: string;
};
export type useOrder2AcceptOfferMutation$variables = {
  input: acceptSellerOfferInput;
};
export type useOrder2AcceptOfferMutation$data = {
  readonly acceptSellerOffer: {
    readonly orderOrError: {
      readonly __typename: "OrderMutationActionRequired";
      readonly actionData: {
        readonly clientSecret: string;
      };
    } | {
      readonly __typename: "OrderMutationError";
      readonly mutationError: {
        readonly code: string;
        readonly message: string;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2AcceptOfferMutation = {
  response: useOrder2AcceptOfferMutation$data;
  variables: useOrder2AcceptOfferMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "acceptSellerOfferPayload",
    "kind": "LinkedField",
    "name": "acceptSellerOffer",
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
                "concreteType": "ExchangeError",
                "kind": "LinkedField",
                "name": "mutationError",
                "plural": false,
                "selections": [
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
                    "name": "message",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "OrderMutationError",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "OrderActionData",
                "kind": "LinkedField",
                "name": "actionData",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "clientSecret",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "OrderMutationActionRequired",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2AcceptOfferMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useOrder2AcceptOfferMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "df3b622cec2261a055412775c7e77b3f",
    "id": null,
    "metadata": {},
    "name": "useOrder2AcceptOfferMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2AcceptOfferMutation(\n  $input: acceptSellerOfferInput!\n) {\n  acceptSellerOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderMutationError {\n        mutationError {\n          code\n          message\n        }\n      }\n      ... on OrderMutationActionRequired {\n        actionData {\n          clientSecret\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cd24910b343cd2c39dd3030d0e52e601";

export default node;
