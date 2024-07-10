/**
 * @generated SignedSource<<ee9ae8047c9a92cc12bcb5eaf092e36a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkGridContext_artworksConnection$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useCollectorSignals_artworksConnection">;
  readonly " $fragmentType": "ArtworkGridContext_artworksConnection";
};
export type ArtworkGridContext_artworksConnection$key = {
  readonly " $data"?: ArtworkGridContext_artworksConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkGridContext_artworksConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkGridContext_artworksConnection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCollectorSignals_artworksConnection"
    }
  ],
  "type": "ArtworkConnectionInterface",
  "abstractKey": "__isArtworkConnectionInterface"
};

(node as any).hash = "35e928a4fa45cece049c7db800f518c8";

export default node;
