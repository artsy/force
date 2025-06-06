/**
 * @generated SignedSource<<674da7c584bef396e52c73863adad90a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SaleArtworksFilter_viewer">;
  readonly " $fragmentType": "SaleApp_viewer";
};
export type SaleApp_viewer$key = {
  readonly " $data"?: SaleApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleApp_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "SaleArtworksFilter_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "6ab51d042899b9ce64ed82719c11e35d";

export default node;
