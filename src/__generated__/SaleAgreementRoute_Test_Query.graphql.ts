/**
 * @generated SignedSource<<504b6e9070b23ab04e118f0810e8e6e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleAgreementRoute_Test_Query$variables = Record<PropertyKey, never>;
export type SaleAgreementRoute_Test_Query$data = {
  readonly saleAgreement: {
    readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementRoute_saleAgreement">;
  };
};
export type SaleAgreementRoute_Test_Query = {
  response: SaleAgreementRoute_Test_Query$data;
  variables: SaleAgreementRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "abc123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM Do, YYYY"
  },
  {
    "kind": "Literal",
    "name": "timezone",
    "value": "UTC"
  }
],
v3 = {
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
    "name": "SaleAgreementRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "SaleAgreement",
        "kind": "LinkedField",
        "name": "saleAgreement",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SaleAgreementRoute_saleAgreement"
          }
        ],
        "storageKey": "saleAgreement(id:\"abc123\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SaleAgreementRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "SaleAgreement",
        "kind": "LinkedField",
        "name": "saleAgreement",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "content",
            "storageKey": "content(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "kind": "ScalarField",
            "name": "displayStartAt",
            "storageKey": "displayStartAt(format:\"MMM Do, YYYY\",timezone:\"UTC\")"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "kind": "ScalarField",
            "name": "displayEndAt",
            "storageKey": "displayEndAt(format:\"MMM Do, YYYY\",timezone:\"UTC\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "saleAgreement(id:\"abc123\")"
      }
    ]
  },
  "params": {
    "cacheID": "fc119b3e6e67e3ca5d7ff1574fc123d3",
    "id": null,
    "metadata": {},
    "name": "SaleAgreementRoute_Test_Query",
    "operationKind": "query",
    "text": "query SaleAgreementRoute_Test_Query {\n  saleAgreement(id: \"abc123\") {\n    ...SaleAgreementRoute_saleAgreement\n    id\n  }\n}\n\nfragment SaleAgreementRoute_saleAgreement on SaleAgreement {\n  internalID\n  content(format: HTML)\n  displayStartAt(format: \"MMM Do, YYYY\", timezone: \"UTC\")\n  displayEndAt(format: \"MMM Do, YYYY\", timezone: \"UTC\")\n  sale {\n    internalID\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "678ddd307999dcc80ea2a79c213e4ba1";

export default node;
