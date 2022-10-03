/**
 * @generated SignedSource<<69f7f8afa8390b8df96bd0436dc2f156>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InstitutionsRoute_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PartnersFeaturedCarousel_viewer">;
  readonly " $fragmentType": "InstitutionsRoute_viewer";
};
export type InstitutionsRoute_viewer$key = {
  readonly " $data"?: InstitutionsRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"InstitutionsRoute_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InstitutionsRoute_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "564e181a258faf3d5c000080"
        }
      ],
      "kind": "FragmentSpread",
      "name": "PartnersFeaturedCarousel_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "8c395bc11a0178f10f342c07631bf2f2";

export default node;
