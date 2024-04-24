/**
 * @generated SignedSource<<66254cbddf37f80486ad8a83b7804cb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleAgreementsApp_Test_Query$variables = Record<PropertyKey, never>;
export type SaleAgreementsApp_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementsApp_viewer">;
  } | null | undefined;
};
export type SaleAgreementsApp_Test_Query = {
  response: SaleAgreementsApp_Test_Query$data;
  variables: SaleAgreementsApp_Test_Query$variables;
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
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SaleAgreementsApp_Test_Query",
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
    "name": "SaleAgreementsApp_Test_Query",
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
    "cacheID": "c52af6336c60b625d9610446fef7a3ff",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.saleAgreementsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleAgreementConnection"
        },
        "viewer.saleAgreementsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SaleAgreementEdge"
        },
        "viewer.saleAgreementsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleAgreement"
        },
        "viewer.saleAgreementsConnection.edges.node.content": (v3/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.displayEndAt": (v3/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.displayStartAt": (v3/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.id": (v4/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.internalID": (v4/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.published": (v5/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewer.saleAgreementsConnection.edges.node.sale.id": (v4/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.sale.internalID": (v4/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.sale.isArtsyLicensed": (v5/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.sale.isAuction": (v6/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.sale.isBenefit": (v6/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.sale.name": (v3/*: any*/),
        "viewer.saleAgreementsConnection.edges.node.status": {
          "enumValues": [
            "ARCHIVED",
            "CURRENT",
            "PAST"
          ],
          "nullable": false,
          "plural": false,
          "type": "SaleAgreementStatus"
        }
      }
    },
    "name": "SaleAgreementsApp_Test_Query",
    "operationKind": "query",
    "text": "query SaleAgreementsApp_Test_Query {\n  viewer {\n    ...SaleAgreementsApp_viewer\n  }\n}\n\nfragment SaleAgreementsApp_viewer on Viewer {\n  ...SaleAgreementsFilter_viewer\n}\n\nfragment SaleAgreementsFilter_viewer on Viewer {\n  saleAgreementsConnection(first: 100) {\n    edges {\n      node {\n        internalID\n        content\n        displayStartAt(format: \"MMM Do, YYYY\", timezone: \"UTC\")\n        displayEndAt(format: \"MMM Do, YYYY\", timezone: \"UTC\")\n        published\n        status\n        sale {\n          internalID\n          name\n          isArtsyLicensed\n          isBenefit\n          isAuction\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4b2f64958190975a8f493b1bd97643ec";

export default node;
