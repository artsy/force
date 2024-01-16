/**
 * @generated SignedSource<<f93d6cfe542cbb1a0086a776a946df1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleApp_sale$data = {
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"SaleMeta_sale">;
  readonly " $fragmentType": "SaleApp_sale";
};
export type SaleApp_sale$key = {
  readonly " $data"?: SaleApp_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleApp_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleApp_sale",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaleMeta_sale"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "481e31885bd9fd7446495abe6c9a9666";

export default node;
