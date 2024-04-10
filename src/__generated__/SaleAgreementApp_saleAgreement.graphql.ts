/**
 * @generated SignedSource<<8b9324809d7cff286986f8664e972abd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleAgreementApp_saleAgreement$data = {
  readonly content: string | null | undefined;
  readonly displayEndAt: string | null | undefined;
  readonly displayStartAt: string | null | undefined;
  readonly internalID: string;
  readonly sale: {
    readonly internalID: string;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "SaleAgreementApp_saleAgreement";
};
export type SaleAgreementApp_saleAgreement$key = {
  readonly " $data"?: SaleAgreementApp_saleAgreement$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementApp_saleAgreement">;
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
  "name": "SaleAgreementApp_saleAgreement",
  "selections": [
    (v0/*: any*/),
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
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "displayStartAt",
      "storageKey": "displayStartAt(format:\"MMM Do, YYYY\")"
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
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
    }
  ],
  "type": "SaleAgreement",
  "abstractKey": null
};
})();

(node as any).hash = "ddf3a4ef054a74fff2217158f7b1e186";

export default node;
