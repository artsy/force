/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type buyerGuaranteeRoutes_BuyerGuaranteeQueryVariables = {};
export type buyerGuaranteeRoutes_BuyerGuaranteeQueryResponse = {
    readonly buyerGuarantee: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_buyerGuarantee">;
    } | null;
};
export type buyerGuaranteeRoutes_BuyerGuaranteeQuery = {
    readonly response: buyerGuaranteeRoutes_BuyerGuaranteeQueryResponse;
    readonly variables: buyerGuaranteeRoutes_BuyerGuaranteeQueryVariables;
};



/*
query buyerGuaranteeRoutes_BuyerGuaranteeQuery {
  buyerGuarantee: me {
    ...BuyerGuaranteeIndex_buyerGuarantee
    id
  }
}

fragment BuyerGuaranteeIndex_buyerGuarantee on Me {
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "buyerGuaranteeRoutes_BuyerGuaranteeQuery",
    "selections": [
      {
        "alias": "buyerGuarantee",
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuyerGuaranteeIndex_buyerGuarantee"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "buyerGuaranteeRoutes_BuyerGuaranteeQuery",
    "selections": [
      {
        "alias": "buyerGuarantee",
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "buyerGuaranteeRoutes_BuyerGuaranteeQuery",
    "operationKind": "query",
    "text": "query buyerGuaranteeRoutes_BuyerGuaranteeQuery {\n  buyerGuarantee: me {\n    ...BuyerGuaranteeIndex_buyerGuarantee\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_buyerGuarantee on Me {\n  name\n}\n"
  }
};
(node as any).hash = '488464bad279f60a09323812ecefac18';
export default node;
