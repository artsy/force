/**
 * @generated SignedSource<<6bc58f0312a8628cf0dd2692ee0f2293>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleAgreementsFilter_viewer$data = {
  readonly saleAgreementsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly body: string | null | undefined;
        readonly internalID: string;
        readonly published: boolean | null | undefined;
        readonly sale: {
          readonly endedAt: string | null | undefined;
          readonly internalID: string;
          readonly isArtsyLicensed: boolean;
          readonly isAuction: boolean | null | undefined;
          readonly isBenefit: boolean | null | undefined;
          readonly name: string | null | undefined;
          readonly startAt: string | null | undefined;
        } | null | undefined;
        readonly status: string | null | undefined;
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
          "value": 10
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
                  "name": "body",
                  "storageKey": null
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
                      "args": (v1/*: any*/),
                      "kind": "ScalarField",
                      "name": "startAt",
                      "storageKey": "startAt(format:\"MMM Do, YYYY\")"
                    },
                    {
                      "alias": null,
                      "args": (v1/*: any*/),
                      "kind": "ScalarField",
                      "name": "endedAt",
                      "storageKey": "endedAt(format:\"MMM Do, YYYY\")"
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "saleAgreementsConnection(first:10)"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "cb08f24f2b2f5a5b38c444210daceef6";

export default node;
