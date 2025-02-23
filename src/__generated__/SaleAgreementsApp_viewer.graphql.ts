/**
 * @generated SignedSource<<573df1e4821001e3645ec2c2d6820ac0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleAgreementsApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementsFilter_viewer">;
  readonly " $fragmentType": "SaleAgreementsApp_viewer";
};
export type SaleAgreementsApp_viewer$key = {
  readonly " $data"?: SaleAgreementsApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleAgreementsApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleAgreementsApp_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaleAgreementsFilter_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "a081bd44aed4c2e6a3cabcdbb6874f24";

export default node;
