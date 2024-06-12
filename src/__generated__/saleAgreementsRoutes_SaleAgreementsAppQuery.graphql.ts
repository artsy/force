/**
 * @generated SignedSource<<7d305a1f5c394a16ec5cd97871b3c3c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type saleAgreementsRoutes_SaleAgreementsAppQuery$variables = Record<PropertyKey, never>;
export type saleAgreementsRoutes_SaleAgreementsAppQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementsApp_viewer">;
  } | null | undefined;
};
export type saleAgreementsRoutes_SaleAgreementsAppQuery = {
  response: saleAgreementsRoutes_SaleAgreementsAppQuery$data;
  variables: saleAgreementsRoutes_SaleAgreementsAppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
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
v2 = {
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
    "name": "saleAgreementsRoutes_SaleAgreementsAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SaleAgreementsApp_viewer"
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
    "name": "saleAgreementsRoutes_SaleAgreementsAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100
              }
            ],
            "concreteType": "SaleAgreementConnection",
            "kind": "LinkedField",
            "name": "saleAgreementsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleAgreementEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleAgreement",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "content",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v1/*: any*/),
                        "kind": "ScalarField",
                        "name": "displayStartAt",
                        "storageKey": "displayStartAt(format:\"MMM Do, YYYY\",timezone:\"UTC\")"
                      },
                      {
                        "alias": null,
                        "args": (v1/*: any*/),
                        "kind": "ScalarField",
                        "name": "displayEndAt",
                        "storageKey": "displayEndAt(format:\"MMM Do, YYYY\",timezone:\"UTC\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "published",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
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
                            "name": "isArtsyLicensed",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isBenefit",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAuction",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleAgreementsConnection(first:100)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "42b1144b3daa6e3b35aaeed40157c8b6",
    "id": null,
    "metadata": {},
    "name": "saleAgreementsRoutes_SaleAgreementsAppQuery",
    "operationKind": "query",
    "text": "query saleAgreementsRoutes_SaleAgreementsAppQuery {\n  viewer {\n    ...SaleAgreementsApp_viewer\n  }\n}\n\nfragment SaleAgreementsApp_viewer on Viewer {\n  ...SaleAgreementsFilter_viewer\n}\n\nfragment SaleAgreementsFilter_viewer on Viewer {\n  saleAgreementsConnection(first: 100) {\n    edges {\n      node {\n        internalID\n        content\n        displayStartAt(format: \"MMM Do, YYYY\", timezone: \"UTC\")\n        displayEndAt(format: \"MMM Do, YYYY\", timezone: \"UTC\")\n        published\n        status\n        sale {\n          internalID\n          name\n          isArtsyLicensed\n          isBenefit\n          isAuction\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "853fbda3488708ff9e11a925fcec23b1";

export default node;
