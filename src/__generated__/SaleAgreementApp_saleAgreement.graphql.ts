/**
 * @generated SignedSource<<1463c1d4d323ec456570896a15d48096>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleAgreementApp_saleAgreement$data = {
  readonly body: string | null | undefined;
  readonly internalID: string;
  readonly sale: {
    readonly endedAt: string | null | undefined;
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly startAt: string | null | undefined;
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
      "name": "body",
      "storageKey": "body(format:\"HTML\")"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleAgreement",
  "abstractKey": null
};
})();

(node as any).hash = "b6cf57ce50eb7090b1b5c36f3532b401";

export default node;
