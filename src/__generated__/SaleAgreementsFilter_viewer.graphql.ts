/**
 * @generated SignedSource<<972437d8b712917f301d8b14f647c454>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SaleAgreementStatus = "ARCHIVED" | "CURRENT" | "PAST" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SaleAgreementsFilter_viewer$data = {
  readonly saleAgreementsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly content: string | null | undefined;
        readonly displayEndAt: string | null | undefined;
        readonly displayStartAt: string | null | undefined;
        readonly internalID: string;
        readonly published: boolean;
        readonly sale: {
          readonly internalID: string;
          readonly isArtsyLicensed: boolean;
          readonly isAuction: boolean | null | undefined;
          readonly isBenefit: boolean | null | undefined;
          readonly name: string | null | undefined;
        };
        readonly status: SaleAgreementStatus;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "SaleAgreementsFilter_viewer";
};
export type SaleAgreementsFilter_viewer$key = {
  readonly " $data"?: SaleAgreementsFilter_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementsFilter_viewer">;
};

const node: ReaderFragment = (function(){
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleAgreementsFilter_viewer",
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
                  "kind": "RequiredField",
                  "field": {
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
                      }
                    ],
                    "storageKey": null
                  },
                  "action": "NONE",
                  "path": "saleAgreementsConnection.edges.node.sale"
                }
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
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "32ce3c6b3a5804f02c949a6e77ee7c92";

export default node;
