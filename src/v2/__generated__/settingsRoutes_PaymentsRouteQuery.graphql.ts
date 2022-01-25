/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_PaymentsRouteQueryVariables = {};
export type settingsRoutes_PaymentsRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsPaymentsRoute_me">;
    } | null;
};
export type settingsRoutes_PaymentsRouteQuery = {
    readonly response: settingsRoutes_PaymentsRouteQueryResponse;
    readonly variables: settingsRoutes_PaymentsRouteQueryVariables;
};



/*
query settingsRoutes_PaymentsRouteQuery {
  me {
    ...SettingsPaymentsRoute_me
    id
  }
}

fragment SettingsPaymentsMethod_method on CreditCard {
  internalID
  name
  brand
  lastDigits
  expirationYear
  expirationMonth
}

fragment SettingsPaymentsMethods_me on Me {
  creditCards(first: 50) {
    edges {
      node {
        internalID
        ...SettingsPaymentsMethod_method
        id
      }
    }
  }
}

fragment SettingsPaymentsRoute_me on Me {
  ...SettingsPaymentsMethods_me
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_PaymentsRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsPaymentsRoute_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "settingsRoutes_PaymentsRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              }
            ],
            "concreteType": "CreditCardConnection",
            "kind": "LinkedField",
            "name": "creditCards",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CreditCardEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "brand",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastDigits",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationYear",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationMonth",
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:50)"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2e4ab6d70f71d7de2c9184a735990191",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_PaymentsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_PaymentsRouteQuery {\n  me {\n    ...SettingsPaymentsRoute_me\n    id\n  }\n}\n\nfragment SettingsPaymentsMethod_method on CreditCard {\n  internalID\n  name\n  brand\n  lastDigits\n  expirationYear\n  expirationMonth\n}\n\nfragment SettingsPaymentsMethods_me on Me {\n  creditCards(first: 50) {\n    edges {\n      node {\n        internalID\n        ...SettingsPaymentsMethod_method\n        id\n      }\n    }\n  }\n}\n\nfragment SettingsPaymentsRoute_me on Me {\n  ...SettingsPaymentsMethods_me\n}\n"
  }
};
})();
(node as any).hash = 'df10e3450f8a62cda2fcd7e65139c4bf';
export default node;
