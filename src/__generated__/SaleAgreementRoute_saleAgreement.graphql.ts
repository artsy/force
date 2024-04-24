/**
 * @generated SignedSource<<589dbbb54fe5e7987a6e44d0475c7601>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleAgreementRoute_saleAgreement$data = {
  readonly content: string;
  readonly displayEndAt: string | null | undefined;
  readonly displayStartAt: string | null | undefined;
  readonly internalID: string;
  readonly sale: {
    readonly internalID: string;
    readonly name: string | null | undefined;
  };
  readonly " $fragmentType": "SaleAgreementRoute_saleAgreement";
} | null | undefined;
export type SaleAgreementRoute_saleAgreement$key = {
  readonly " $data"?: SaleAgreementRoute_saleAgreement$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementRoute_saleAgreement">;
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
  "name": "SaleAgreementRoute_saleAgreement",
  "selections": [
    (v0/*: any*/),
    {
      "kind": "RequiredField",
      "field": {
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
      "action": "NONE",
      "path": "content"
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
          }
        ],
        "storageKey": null
      },
      "action": "NONE",
      "path": "sale"
    }
  ],
  "type": "SaleAgreement",
  "abstractKey": null
};
})();

(node as any).hash = "f4722283152ee23c76142fd1b8f403ec";

export default node;
