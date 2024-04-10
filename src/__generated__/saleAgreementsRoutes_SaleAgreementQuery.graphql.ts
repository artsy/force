/**
 * @generated SignedSource<<443bd456d60ec23ed452279ca912c24e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type saleAgreementsRoutes_SaleAgreementQuery$variables = {
  id: string;
};
export type saleAgreementsRoutes_SaleAgreementQuery$data = {
  readonly saleAgreement: {
    readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementApp_saleAgreement">;
  };
};
export type saleAgreementsRoutes_SaleAgreementQuery = {
  response: saleAgreementsRoutes_SaleAgreementQuery$data;
  variables: saleAgreementsRoutes_SaleAgreementQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM Do, YYYY"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "saleAgreementsRoutes_SaleAgreementQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SaleAgreement",
        "kind": "LinkedField",
        "name": "saleAgreement",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SaleAgreementApp_saleAgreement"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "saleAgreementsRoutes_SaleAgreementQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SaleAgreement",
        "kind": "LinkedField",
        "name": "saleAgreement",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "displayStartAt",
            "storageKey": "displayStartAt(format:\"MMM Do, YYYY\")"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "displayEndAt",
            "storageKey": "displayEndAt(format:\"MMM Do, YYYY\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a424fefbd68026eb3bf191acba9ab734",
    "id": null,
    "metadata": {},
    "name": "saleAgreementsRoutes_SaleAgreementQuery",
    "operationKind": "query",
    "text": "query saleAgreementsRoutes_SaleAgreementQuery(\n  $id: ID!\n) {\n  saleAgreement(id: $id) {\n    ...SaleAgreementApp_saleAgreement\n    id\n  }\n}\n\nfragment SaleAgreementApp_saleAgreement on SaleAgreement {\n  internalID\n  content(format: HTML)\n  displayStartAt(format: \"MMM Do, YYYY\")\n  displayEndAt(format: \"MMM Do, YYYY\")\n  sale {\n    internalID\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c85b308e947753bd19e6e5309d57df6b";

export default node;
