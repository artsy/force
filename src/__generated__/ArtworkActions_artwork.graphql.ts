/**
 * @generated SignedSource<<6c82ba57449816fd1bc5a2dcb09299c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActions_artwork$data = {
  readonly downloadableImageUrl: string | null;
  readonly isDownloadable: boolean | null;
  readonly isHangable: boolean | null;
  readonly partner: {
    readonly slug: string;
  } | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_artwork" | "ArtworkDownloadButton_artwork" | "ArtworkSharePanel_artwork" | "ViewInRoom_artwork">;
  readonly " $fragmentType": "ArtworkActions_artwork";
};
export type ArtworkActions_artwork$key = {
  readonly " $data"?: ArtworkActions_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActions_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActions_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActionsSaveButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDownloadButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSharePanel_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewInRoom_artwork"
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "downloadableImageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDownloadable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isHangable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "3281d551bc9ebd3d0e0a0e01131c9fd2";

export default node;
