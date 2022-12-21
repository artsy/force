/**
 * @generated SignedSource<<8d8aa7c2dfd87683cd0d4328240acd46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionCreateArtwork_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkFormArtistStep_me">;
  readonly " $fragmentType": "MyCollectionCreateArtwork_me";
};
export type MyCollectionCreateArtwork_me$key = {
  readonly " $data"?: MyCollectionCreateArtwork_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionCreateArtwork_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionCreateArtwork_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkFormArtistStep_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "ca0947e571317a3727f7e391c4124bc8";

export default node;
