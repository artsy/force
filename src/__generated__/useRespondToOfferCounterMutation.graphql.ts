/**
 * @generated SignedSource<<40880fa93937182b335db1c7a4ca755a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CommerceBuyerCounterOfferInput = {
  amountCents: number;
  clientMutationId?: string | null | undefined;
  note?: string | null | undefined;
  offerId: string;
};
export type useRespondToOfferCounterMutation$variables = {
  input: CommerceBuyerCounterOfferInput;
};
export type useRespondToOfferCounterMutation$data = {
  readonly commerceBuyerCounterOffer: {
    readonly orderOrError: {
      readonly __typename: "CommerceOrderWithMutationFailure";
      readonly error: {
        readonly code: string;
        readonly data: string | null | undefined;
        readonly type: string;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type useRespondToOfferCounterMutation = {
  response: useRespondToOfferCounterMutation$data;
  variables: useRespondToOfferCounterMutation$variables;
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
    "concreteType": "CommerceBuyerCounterOfferPayload",
    "kind": "LinkedField",
    "name": "commerceBuyerCounterOffer",
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
                "concreteType": "CommerceApplicationError",
                "kind": "LinkedField",
                "name": "error",
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
                    "name": "data",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOrderWithMutationFailure",
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
    "name": "useRespondToOfferCounterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useRespondToOfferCounterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1e7a97e96b42949874678b2d5dc52dd4",
    "id": null,
    "metadata": {},
    "name": "useRespondToOfferCounterMutation",
    "operationKind": "mutation",
    "text": "mutation useRespondToOfferCounterMutation(\n  $input: CommerceBuyerCounterOfferInput!\n) {\n  commerceBuyerCounterOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          code\n          data\n          type\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e64e298a660d01afc3168182f9bbf49c";

export default node;
