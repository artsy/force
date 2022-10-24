/**
 * @generated SignedSource<<bab99f5c72de60fdd722d756dd3fd1ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionInsightsMedianSalePriceAtAuction_artist$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  readonly " $fragmentType": "MyCollectionInsightsMedianSalePriceAtAuction_artist";
};
export type MyCollectionInsightsMedianSalePriceAtAuction_artist$key = {
  readonly " $data"?: MyCollectionInsightsMedianSalePriceAtAuction_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionInsightsMedianSalePriceAtAuction_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionInsightsMedianSalePriceAtAuction_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntityHeaderArtist_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "aa687bac3a5d11a40155542462fdf17b";

export default node;
